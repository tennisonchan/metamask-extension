import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BigNumber from 'bignumber.js';
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

const transformNum = (num = 0, showDecimals = false) =>
  showDecimals ? new BigNumber(num).toString(10) : num;

const SortByOptions = [
  { name: 'Block number ↑', value: 'number:desc' },
  { name: 'Block number ↓', value: 'number:asc' },
  { name: 'Nonce ↑', value: 'nonce:desc' },
  { name: 'Nonce ↓', value: 'nonce:asc' },
  { name: 'Gas limit ↑', value: 'gasLimit:desc' },
  { name: 'Gas limit ↓', value: 'gasLimit:asc' },
  { name: 'Gas used ↑', value: 'gasUsed:desc' },
  { name: 'Gas used ↓', value: 'gasUsed:asc' },
  { name: 'Transaction count ↑', value: 'transactions:desc' },
  { name: 'Transaction count ↓', value: 'transactions:asc' },
];

const sortByAttr = (blocks, sortBy) => {
  const [sortAttr, order] = sortBy.split(':');
  const isAcs = order === 'asc';
  return [...blocks].sort((aa, bb) => (aa[sortAttr] - bb[sortAttr]) * (isAcs || -1))
}

const BlockList = () => {
  const dispatch = useDispatch();
  const blocks = useSelector((state) => state.metamask.blocks);
  const showDecimals = useSelector((state) => state.metamask.showDecimals);
  const sortBy = useSelector((state) => state.metamask.sortBy);
  const sortedBlocks = sortByAttr(blocks, sortBy);
  const currentAddress = useSelector((state) => getSelectedAddress(state));

  const handleResetButtonClick = () => dispatch(resetBlockList());
  const isNoBlocks = blocks.length === 0;

  const handleToggleNumbers = () =>
    dispatch(showNumbersAsDecimals(!showDecimals));
  const showDecimalButtonText = showDecimals
    ? 'Display numbers as hexadecimal'
    : 'Display numbers as decimals';

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
          Reset Block List
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
        const { number, hash, nonce, gasLimit, gasUsed, transactions, author } = block;
        const isSentByUser = author === currentAddress || true;
        return (
          <div className="block-list__block" key={`block-${i}`}>
            {isSentByUser && <div className="block-list__star-wrap">
              <StarIcon />
            </div>}
            <div className="block-list__close" onClick={handleClose(hash)} />
            <span>{`Number: ${transformNum(number, showDecimals)}`}</span>
            <span>{`Hash: ${hash}`}</span>
            <span>{`Nonce: ${transformNum(nonce, showDecimals)}`}</span>
            <span>{`GasLimit: ${transformNum(gasLimit, showDecimals)}`}</span>
            <span>{`GasUsed: ${transformNum(gasUsed, showDecimals)}`}</span>
            <span>{`Transaction Count: ${transactions.length}`}</span>
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
