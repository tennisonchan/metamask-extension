import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getMaximumGasTotalInHexWei } from '../../../../../shared/modules/gas.utils';
import { GasLevelIconMap } from '../../../../helpers/constants/gas';
import { PRIMARY } from '../../../../helpers/constants/common';
import {
  decGWEIToHexWEI,
  decimalToHex,
} from '../../../../helpers/utils/conversions.util';
import { toHumanReadableTime } from '../../../../helpers/utils/util';
import { useGasFeeContext } from '../../../../contexts/gasFee';
import { useI18nContext } from '../../../../hooks/useI18nContext';
import I18nValue from '../../../ui/i18n-value';
import InfoTooltip from '../../../ui/info-tooltip';
import UserPreferencedCurrencyDisplay from '../../user-preferenced-currency-display';

const EditGasItem = ({ estimateType, onClose }) => {
  const {
    estimateUsed,
    gasFeeEstimates,
    gasLimit,
    maxFeePerGas: currentMaxFeePerGas,
    setEstimateToUse,
    updateTransaction,
    transaction: { dappSuggestedGasFees },
  } = useGasFeeContext();
  const t = useI18nContext();

  let maxFeePerGas;
  let minWaitTime;

  if (gasFeeEstimates[estimateType]) {
    const { minWaitTimeEstimate, suggestedMaxFeePerGas } = gasFeeEstimates[
      estimateType
    ];
    maxFeePerGas = suggestedMaxFeePerGas;
    minWaitTime = minWaitTimeEstimate;
  } else if (estimateType === 'dappSuggested' && dappSuggestedGasFees) {
    // todo: time estimation for dappSuggested and custom estimateType
    maxFeePerGas = dappSuggestedGasFees.maxFeePerGas;
  } else if (estimateType === 'custom' && estimateUsed === 'custom') {
    // todo: we should show default custom setting for user if available
    maxFeePerGas = currentMaxFeePerGas;
  }

  const hexMaximumTransactionFee = maxFeePerGas
    ? getMaximumGasTotalInHexWei({
        gasLimit: decimalToHex(gasLimit),
        maxFeePerGas: decGWEIToHexWEI(maxFeePerGas),
      })
    : null;

  const onOptionSelect = () => {
    setEstimateToUse(estimateType);
    updateTransaction(estimateType);
    onClose();
  };

  return (
    <div
      className={classNames('edit-gas-item', {
        [`edit-gas-item-selected`]: estimateType === estimateUsed,
        [`edit-gas-item-disabled`]:
          estimateType === 'dappSuggested' && !dappSuggestedGasFees,
      })}
      role="button"
      onClick={onOptionSelect}
    >
      <span className="edit-gas-item__name">
        {/* todo: fix custom icon */}
        <span className="edit-gas-item__icon">
          {GasLevelIconMap[estimateType]}
        </span>
        <I18nValue
          messageKey={
            estimateType === 'dappSuggested'
              ? 'dappSuggestedShortLabel'
              : estimateType
          }
        />
      </span>
      <span
        className={`edit-gas-item__time-estimate edit-gas-item__time-estimate-${estimateType}`}
      >
        {minWaitTime
          ? minWaitTime && toHumanReadableTime(minWaitTime, t)
          : '--'}
      </span>
      <span
        className={`edit-gas-item__fee-estimate edit-gas-item__fee-estimate-${estimateType}`}
      >
        {maxFeePerGas ? (
          <UserPreferencedCurrencyDisplay
            key="editGasSubTextFeeAmount"
            type={PRIMARY}
            value={hexMaximumTransactionFee}
          />
        ) : (
          '--'
        )}
      </span>
      <span className="edit-gas-item__tooltip">
        <InfoTooltip position="top" />
      </span>
    </div>
  );
};

EditGasItem.propTypes = {
  estimateType: PropTypes.string,
  onClose: PropTypes.func,
};

export default EditGasItem;
