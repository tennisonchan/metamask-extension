import React from 'react';
import PropTypes from 'prop-types';

// free good stuff from https://iconscout.com/icon/star-bookmark-favorite-shape-rank-15
export default function Star({ className, size = "24", color = "#000" }) {
  return (
    <img
      className={className}
      width={size}
      height={size}
      src="./images/icons/star.svg"
      alt="star icon"
    />
  );
}

Star.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
};
