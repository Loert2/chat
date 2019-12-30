import React, { Component } from "react";

class InputField extends Component {
  handleChange = event => {
    event.preventDefault();
    this.props.onChange(event.target.value);
  };
  render() {
    return (
      <div>
        <label className={this.props.labelClass}>{this.props.label}</label>
        <input
          className={this.props.className}
          type={this.props.type}
          autoFocus
          required
          value={this.props.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default InputField;
