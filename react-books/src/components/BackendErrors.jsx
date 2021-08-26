import React from "react";

const BackendErrors = ({errors}) => {
  const errorsArray = Object.keys(errors).map(e => {
    return errors[e];
  });

  return (
    <ul className="text-danger">
      {errorsArray && errorsArray.map(error => (
        <li key={error}>{error}</li>
      ))}
    </ul>
  );
}

export default BackendErrors;