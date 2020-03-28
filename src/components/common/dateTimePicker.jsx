import React, { Component } from "react";
import DatePicker from "react-datepicker2";

class DateTimePicker extends Component {
  handleChange = value => {
    const { name, onChange } = this.props;
    const input = {
      currentTarget: {
        name: name,
        value: value
      }
    };
    onChange(input);
  };

  render() {
    const { name, label, error, onChange, ...rest } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <DatePicker
          name={name}
          id={name}
          onChange={this.handleChange}
          {...rest}
          className="form-control"
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default DateTimePicker;
