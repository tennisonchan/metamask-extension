import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { renderWithProvider } from '../../../../test/jest';
import BlockList, { _test } from '.';

const { transformNum, sortByAttr } = _test;

const createBlocksMockStore = (updateObject = {}) => {
  return {
    metamask: {
      showDecimals: false,
      sortBy: 'number:desc',
      blocks: [
        {
          number: '0x1',
          hash: '0x2',
          nonce: '0x3',
          gasLimit: '0x4',
          gasUsed: '0x5',
          transactions: ['0x6'],
        },
      ],
      ...updateObject,
    },
  };
};

const middleware = [thunk];

describe('BlockList', () => {
  it('renders the component with initial props', () => {
    const store = configureMockStore(middleware)(createBlocksMockStore());
    const { getByText } = renderWithProvider(<BlockList />, store);
    expect(getByText('Block number ↑')).toBeInTheDocument();
    expect(getByText('Display numbers as decimals')).toBeInTheDocument();
    expect(getByText('Number: 0x1')).toBeInTheDocument();
    expect(getByText('Hash: 0x2')).toBeInTheDocument();
    expect(getByText('Nonce: 0x3')).toBeInTheDocument();
    expect(getByText('GasLimit: 0x4')).toBeInTheDocument();
    expect(getByText('GasUsed: 0x5')).toBeInTheDocument();
    expect(getByText('Transaction Count: 1')).toBeInTheDocument();
  });

  it('renders the component correctly when showDecimals: true', () => {
    const store = configureMockStore(middleware)(
      createBlocksMockStore({ showDecimals: true }),
    );
    const { getByText } = renderWithProvider(<BlockList />, store);
    expect(getByText('Number: 1')).toBeInTheDocument();
    expect(getByText('Hash: 0x2')).toBeInTheDocument();
    expect(getByText('Nonce: 3')).toBeInTheDocument();
    expect(getByText('GasLimit: 4')).toBeInTheDocument();
    expect(getByText('GasUsed: 5')).toBeInTheDocument();
    expect(getByText('Transaction Count: 1')).toBeInTheDocument();
  });

  it('should disable the rest button when there are no blocks', () => {
    const store = configureMockStore(middleware)(
      createBlocksMockStore({ blocks: [] }),
    );
    const { getByText } = renderWithProvider(<BlockList />, store);
    expect(getByText(/Reset Block List/i).closest('button')).toBeDisabled();
  });
});

describe('transformNum', () => {
  it('renders original string when showDecimals is false', () => {
    expect(transformNum('0x92d2d2', false)).toBe('0x92d2d2');
  });

  it('renders decimal when showDecimals is true', () => {
    expect(transformNum('0x92d2d2', true)).toBe('9622226');
  });

  it('renders original string when showDecimals is undefined', () => {
    expect(transformNum('0x92d2d2')).toBe('0x92d2d2');
  });
});

describe('sortByAttr', () => {
  let arr
  beforeEach(() => {
    arr = [{number: 2}, {number: 1}, {number: 3}]
  });

  it('renders the arr sort by number in asc', () => {
    expect(sortByAttr(arr, 'number:asc')).toEqual([{number: 1}, {number: 2}, {number: 3}]);
  });

  it('renders the arr sort by number in desc', () => {
    expect(sortByAttr(arr, 'number:desc')).toEqual([{number: 3}, {number: 2}, {number: 1}]);
  });
});