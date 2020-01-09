const isJSONResponse = response =>
  response.headers &&
  response.headers.get("content-type") &&
  response.headers.get("content-type").match(/application\/json/);

const processOkResponse = (response, callback) => data =>
  callback(data !== undefined ? data : response);

const processErrorResponse = (response, callback) => data => {
  const errorStatus = {
    statusText: response.statusText,
    status: response.status
  };
  data ? callback({ ...errorStatus, ...data }) : callback(errorStatus);
};

const handleResponse = (response, callback) => {
  if (isJSONResponse(response)) {
    response.json().then(data => callback(data));
  } else {
    callback();
  }
};

const handleOkResponse = (response, callback) =>
  handleResponse(response, processOkResponse(response, callback));
const handleErrorResponse = (response, callback) =>
  handleResponse(response, processErrorResponse(response, callback));

const defaultContentType = {
  "Content-Type": "application/json; charset=utf-8"
};

export default baseUrl => params =>
  new Promise((resolve, reject) => {
    fetch(baseUrl + (params.url || ""), {
      method: params.type || "POST",
      body: JSON.stringify(params.data),
      headers: defaultContentType,
      credentials: params.credentials || "same-origin"
    })
      .then(response => {
        if (response.ok) {
          handleOkResponse(response, resolve);
        } else {
          handleErrorResponse(response, reject);
        }
      })
      .catch(error => handleErrorResponse(error, reject));
  });
