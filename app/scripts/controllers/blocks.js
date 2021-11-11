import { ObservableStore } from '@metamask/obs-store';
import BigNumber from 'bignumber.js';

export default class BlockController {
  constructor(opts = {}) {
    const { blockTracker, provider } = opts;

    const initState = {
      blocks: [],
      showDecimals: false,
      sortBy: 'number:desc',
    };
    this.provider = provider;
    this.store = new ObservableStore(initState);

    blockTracker.removeListener('latest', this._updateBlocks);
    blockTracker.addListener('latest', this._updateBlocks);
  }

  _updateBlocks = async (blockNumber) => {
    const { blocks } = this.store.getState();
    const res = await this.provider.sendAsync({
      jsonrpc: '2.0',
      method: 'eth_getBlockByNumber',
      params: [blockNumber, false],
      id: 1,
    });
    const latestBlock = res.result;
    const { transactions = [] } = latestBlock || {};

    const responses = await Promise.all(transactions.map((tx) =>
      this.provider.sendAsync({
        jsonrpc: '2.0',
        method: 'eth_getTransactionByHash',
        params: [tx],
        id: 1,
      })
    ))
    const txValues = responses.map((res) => res?.result?.value) || [];
    const maxTransactionValue = `0x${BigNumber.max.apply(null, txValues).toString(16)}`;

    this.store.updateState({
      blocks: [...blocks, {...latestBlock, maxTransactionValue }],
    });
  };

  resetBlockList = () => {
    this.store.updateState({
      // initState.block is an array
      blocks: [],
    });
  };

  showNumbersAsDecimals = (showDecimals) => {
    this.store.updateState({ showDecimals });
  };

  removeBlockByHash = (hash) => {
    const { blocks } = this.store.getState();
    this.store.updateState({
      blocks: blocks.filter((b) => b.hash !== hash),
    });
  };

  selectSortByOption = (sortBy) => {
    this.store.updateState({ sortBy });
  }
}
