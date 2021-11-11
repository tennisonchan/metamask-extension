import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Card = ({ className, children, onClick, ...props }) => {
  return (
    <div className={classnames('card', className)} {...{ onClick, ...props }}>
      {children}
    </div>
  );
};

Card.propTypes = {
  /**
   * Additional className/s that can be added to the root div of the Card component
   */
  className: PropTypes.string,
  /**
   * The children of the card
   */
  children: PropTypes.node,
  /**
   * The onClick function of the card
   */
  onClick: PropTypes.func,
};

export default Card;
