import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useI18nContext } from '../../../../hooks/useI18nContext';
import Tooltip from '../../../ui/tooltip';
import Button from '../../../ui/button';
import Copy from '../../../ui/icon/copy-icon.component';
import { hideModal } from '../../../../store/actions';
import withModalProps from '../../../../helpers/higher-order-components/with-modal-props';
import { useCopyToClipboard } from '../../../../hooks/useCopyToClipboard';

const TransactionErrorDetailsModal = ({ message }) => {
  const [copied, handleCopy] = useCopyToClipboard();
  const dispatch = useDispatch();

  const t = useI18nContext();

  const handleClose = () => {
    dispatch(hideModal());
  };

  return (
    <div className="transaction-error-details__main">
      <div className="transaction-error-details__header">
        <div className="transaction-error-details__header__title">
          <h2>{t('details')}</h2>
          <button
            className="fas fa-times popover-header__button"
            title={t('close')}
            data-testid="popover-close"
            onClick={() => handleClose()}
          />
        </div>
      </div>
      <hr />
      <p>{message}</p>
      <br />
      <Tooltip
        position="bottom"
        title={copied ? t('copiedExclamation') : t('copyToClipboard')}
      >
        <Button
          type="link"
          onClick={() => {
            handleCopy(message);
          }}
        >
          <Copy size={17} color="#3098DC" />
          {t('copyToClipboard')}
        </Button>
      </Tooltip>
    </div>
  );
};

TransactionErrorDetailsModal.propTypes = {
  message: PropTypes.string,
};

export default withModalProps(TransactionErrorDetailsModal);
