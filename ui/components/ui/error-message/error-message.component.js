import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = (props, context) => {
  const { errorMessage, errorKey, onErrorMessageClick, linkText } = props;
  const error = errorKey ? context.t(errorKey) : errorMessage;

  return (
    <div className="error-message">
      <img
        src="./images/alert-red.svg"
        alt=""
        className="error-message__icon"
      />
      <div className="error-message__text">
        {error}{' '}
        <span className="error-message__link" onClick={onErrorMessageClick}>
          {linkText}
        </span>
      </div>
    </div>
  );
};

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string,
  errorKey: PropTypes.string,
  linkText: PropTypes.string.isRequired,
  onErrorMessageClick: PropTypes.func.isRequired,
};

ErrorMessage.contextTypes = {
  t: PropTypes.func,
};

export default ErrorMessage;
