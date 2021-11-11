import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BigNumber from 'bignumber.js';
import { resetBlockList, showNumbersAsDecimals } from '../../../store/actions';
import Button from '../../ui/button';

const transformNum = (num, showDecimals = false) =>
  showDecimals ? new BigNumber(num).toString(10) : num;

const BlockList = () => {
  const dispatch = useDispatch();
  const blocks = useSelector((state) => state.metamask.blocks);
  const showDecimals = useSelector((state) => state.metamask.showDecimals);

  const handleResetButtonClick = () => dispatch(resetBlockList());
  const isNoBlocks = blocks.length === 0;

  const handleToggleNumbers = () =>
    dispatch(showNumbersAsDecimals(!showDecimals));
  const showDecimalButtonText = showDecimals
    ? 'Display numbers as hexadecimal'
    : 'Display numbers as decimals';

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
      {blocks.map((block, i) => {
        const { number, hash, nonce, gasLimit, gasUsed, transactions } = block;
        return (
          <div className="block-list__block" key={`block-${i}`}>
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
};

export default BlockList;
