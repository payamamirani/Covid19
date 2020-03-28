import React from "react";

const TextArea = ({ name, label, error, value, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <textarea
        className="form-control"
        {...rest}
        id={name}
        name={name}
        value={value}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default TextArea;
