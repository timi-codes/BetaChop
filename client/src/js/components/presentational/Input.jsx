import React from 'react';
import ReactDOM from 'react-dom';

const Input = ({ label, text, type, id, value, handleChange }) => (
  <div className="form-group">
    <label htmlFor={label}>{text}</label>
    <input
      type={type}
      className="form-control"
      id={id}
      value={value}
      onChange={handleChange}
      required
    />
  </div>
);

Input.protoTypes = {
  label: PropTypes.String.isRequired,
  text: PropTypes.String.isRequired,
  type: PropTypes.String.isRequired,
  id: PropTypes.String.isRequired,
  value: PropTypes.String.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Input;
