import { compose } from 'redux';
import withModalProps from '../../../../helpers/higher-order-components/with-modal-props';
import TransactionDetailsModal from './transaction-error-details-modal.component';

export default compose(withModalProps)(TransactionDetailsModal);
