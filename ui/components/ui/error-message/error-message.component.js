import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button';

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
        {error}
        {linkText ? (
          <a className="error-message__link" onClick={onErrorMessageClick}>
            {` ${linkText}`}
          </a>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string,
  errorKey: PropTypes.string,
  linkText: PropTypes.string,
  onErrorMessageClick: PropTypes.func,
};

ErrorMessage.contextTypes = {
  t: PropTypes.func,
};

export default ErrorMessage;
