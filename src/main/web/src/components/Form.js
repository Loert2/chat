import React, { Component } from "react";
import InputField from "./InputField";

class Form extends Component {
  state = {};

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  };

  render() {
    return (
      <div className="containerLog">
        <div className="containerAuth">
          <form onSubmit={this.handleSubmit}>
            <div className="auth-form-body">
              {this.props.fileds.map(el => (
                <InputField
                  key={el.label + el.type + el.required + this.props[el.name]}
                  label={el.label}
                  labelClass={el.labelClass}
                  className={el.className}
                  type={el.type}
                  required
                  value={this.props[el.name]}
                  onChange={value => this.setState({ [el.name]: value })}
                />
              ))}
              {this.props.error && (
                <label className="error">{this.props.error}</label>
              )}
              <div className="button">
                <input
                  type="submit"
                  className="dws-submit"
                  value={this.props.button}
                />
              </div>
            </div>
          </form>
          <p className="button">{this.props.link}</p>
        </div>
      </div>
    );
  }
}
export default Form;
