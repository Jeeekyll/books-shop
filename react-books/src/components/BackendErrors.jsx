import React from "react";

const BackendErrors = ({errors}) => {
  const errorsArray = Object.keys(errors).map(errorKey => {
    return errors[errorKey];
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