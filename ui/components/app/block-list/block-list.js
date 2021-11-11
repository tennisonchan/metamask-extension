import React, { useContext, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BigNumber from 'bignumber.js';
import { I18nContext } from '../../../contexts/i18n';
import {
  resetBlockList,
  showNumbersAsDecimals,
  removeBlockByHash,
  selectSortByOption,
} from '../../../store/actions';
import Button from '../../ui/button';
import Dropdown from '../../ui/dropdown';
import {
  getMetaMaskAccountsOrdered,
  getSelectedAddress,
} from '../../../selectors';
import StarIcon from '../../ui/icon/star-icon.component';
import { getCurrentChainId } from '../../../selectors/selectors';
import { NETWORK_TO_NAME_MAP } from '../../../../shared/constants/network';

const transformNum = (num = 0, showDecimals = false) =>
  showDecimals ? new BigNumber(num).toString(10) : num;

const sortByAttr = (blocks, sortBy) => {
  const [sortAttr, order] = sortBy.split(':');
  const isAcs = order === 'asc';
  return [...blocks].sort((aa, bb) => (aa[sortAttr] - bb[sortAttr]) * (isAcs || -1))
}

const BlockList = () => {
  const t = useContext(I18nContext);
  const dispatch = useDispatch();
  const blocks = useSelector((state) => state.metamask.blocks);
  const showDecimals = useSelector((state) => state.metamask.showDecimals);
  const sortBy = useSelector((state) => state.metamask.sortBy);
  const currentAddress = useSelector((state) => getSelectedAddress(state));
  const handleResetButtonClick = () => dispatch(resetBlockList());
  const chainId = useSelector(getCurrentChainId);
  const filteredByChainIdBlocks = blocks.filter(b => b.chainId === chainId);
  const sortedBlocks = sortByAttr(filteredByChainIdBlocks, sortBy);
  const isNoBlocks = filteredByChainIdBlocks.length === 0;

  const SortByOptions = useMemo(() => [
    { name: `${t("blockNumber")} ↑`, value: 'number:desc' },
    { name: `${t("blockNumber")} ↓`, value: 'number:asc' },
    { name: `${t("nonce")} ↑`, value: 'nonce:desc' },
    { name: `${t("nonce")} ↓`, value: 'nonce:asc' },
    { name: `${t("gasLimit")} ↑`, value: 'gasLimit:desc' },
    { name: `${t("gasLimit")} ↓`, value: 'gasLimit:asc' },
    { name: `${t("gasUsed")} ↑`, value: 'gasUsed:desc' },
    { name: `${t("gasUsed")} ↓`, value: 'gasUsed:asc' },
    { name: `${t("transactionCount")} ↑`, value: 'transactions:desc' },
    { name: `${t("transactionCount")} ↓`, value: 'transactions:asc' },
  ], t);

  const handleToggleNumbers = () =>
    dispatch(showNumbersAsDecimals(!showDecimals));
  const showDecimalButtonText = showDecimals
    ? t('displayNumbersAsHex')
    : t('displayNumbersAsDeci');

  const handleClose = (hash) => () => {
    dispatch(removeBlockByHash(hash));
  };

  const handleSortBySelect = (sortBy) => {
    dispatch(selectSortByOption(sortBy));
  }

  return (
    <div className="block-list">
      <div className="block-list__buttons">
        <Button
          type="secondary"
          rounded
          disabled={isNoBlocks}
          onClick={handleResetButtonClick}
        >
          {t('resetBlockList')}
        </Button>
        <Button
          type="secondary"
          rounded
          disabled={isNoBlocks}
          onClick={handleToggleNumbers}
        >
          {showDecimalButtonText}
        </Button>
      </div>
      <div className="block-list__dropdown">
        <Dropdown
          title="Sort By"
          onChange={handleSortBySelect}
          options={SortByOptions}
          selectedOption={sortBy}
        />
      </div>
      {sortedBlocks.map((block, i) => {
        const { number, hash, nonce, gasLimit, gasUsed, transactions, author, maxTransactionValue, chainId } = block;
        const isSentByUser = author === currentAddress || true;
        return (
          <div className="block-list__block" key={`block-${i}`}>
            {isSentByUser && <div className="block-list__star-wrap">
              <StarIcon />
            </div>}
            <div className="block-list__close" onClick={handleClose(hash)} />
            <span>{`${t("number")}: ${transformNum(number, showDecimals)}`}</span>
            <span>{`${t("network")}: ${NETWORK_TO_NAME_MAP[chainId]}`}</span>
            <span>{`${t("hash")}: ${hash}`}</span>
            <span>{`${t("nonce")}: ${transformNum(nonce, showDecimals)}`}</span>
            <span>{`${t("gasLimit")}: ${transformNum(gasLimit, showDecimals)}`}</span>
            <span>{`${t("gasUsed")}: ${transformNum(gasUsed, showDecimals)}`}</span>
            <span>{`${t("transactionCount")}: ${transactions.length}`}</span>
            <span>{`${t("maxTransactionValue")}: ${transformNum(maxTransactionValue, showDecimals)}`}</span>
          </div>
        );
      })}
    </div>
  );
};

export const _test = {
  transformNum,
  sortByAttr,
};

export default BlockList;
