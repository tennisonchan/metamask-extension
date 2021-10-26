import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import {
  setTransactionToConfirm,
  clearConfirmTransaction,
} from '../../ducks/confirm-transaction/confirm-transaction.duck';
import {
  getStatusKey,
  isTokenMethodAction,
} from '../../helpers/utils/transactions.util';

import {
  getContractMethodData,
  getTokenParams,
  setDefaultHomeActiveTabName,
} from '../../store/actions';
import {
  unconfirmedTransactionsListSelector,
  getFailedTransactionsToDisplayCount,
  getFailedTransactionsToDisplay,
} from '../../selectors';
import { getMostRecentOverviewPage } from '../../ducks/history/history';
import { getSendTo } from '../../ducks/send';
import { TRANSACTION_STATUSES } from '../../../shared/constants/transaction';
import ConfirmTransaction from './confirm-transaction.component';

const mapStateToProps = (state, ownProps) => {
  const {
    metamask: { unapprovedTxs },
  } = state;
  const {
    match: { params = {} },
  } = ownProps;
  const { id } = params;
  const sendTo = getSendTo(state);

  const unconfirmedTransactions = unconfirmedTransactionsListSelector(state);
  const failedTransactionsToDisplay = getFailedTransactionsToDisplay(state);
  const totalUnconfirmed = unconfirmedTransactions.length;

  if (failedTransactionsToDisplay && failedTransactionsToDisplay[id]) {
    const status = getStatusKey(failedTransactionsToDisplay[id]);
    if (status !== TRANSACTION_STATUSES.FAILED && status !== TRANSACTION_STATUSES.SIGNED) {
      delete failedTransactionsToDisplay[id];
    }
  }
  const transaction =
    totalUnconfirmed || failedTransactionsToDisplay[id]
      ? unapprovedTxs[id] ||
      failedTransactionsToDisplay[id] ||
      unconfirmedTransactions[0]
      : {};
  const { id: transactionId, type } = transaction;

  return {
    totalUnapprovedCount: totalUnconfirmed,
    sendTo,
    unapprovedTxs,
    id,
    mostRecentOverviewPage: getMostRecentOverviewPage(state),
    paramsTransactionId: id && String(id),
    transactionId: transactionId && String(transactionId),
    transaction,
    isTokenMethodAction: isTokenMethodAction(type),
    failedTransactionsToDisplayCount: getFailedTransactionsToDisplayCount(
      state,
    ),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTransactionToConfirm: (transactionId) => {
      dispatch(setTransactionToConfirm(transactionId));
    },
    clearConfirmTransaction: () => dispatch(clearConfirmTransaction()),
    getContractMethodData: (data) => dispatch(getContractMethodData(data)),
    getTokenParams: (tokenAddress) => dispatch(getTokenParams(tokenAddress)),
    setDefaultHomeActiveTabName: (tabName) =>
      dispatch(setDefaultHomeActiveTabName(tabName)),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(ConfirmTransaction);
