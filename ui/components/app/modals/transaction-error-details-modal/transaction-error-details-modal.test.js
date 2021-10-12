import React from 'react';
import { shallow } from 'enzyme';
import { Tooltip } from '@material-ui/core';
import Copy from '../../../ui/icon/copy-icon.component';
import TransactionErrorDetailsModal from './transaction-error-details-modal.container';

describe('Transaction Error Details Modal', () => {
  let wrapper;

  const props = {
    network: 'test',
    message: `[ethjs-query] while formatting outputs from RPC '{"value":{"code":-32000,"message":"intrinsic gas too low"}}'`,
  };

  beforeEach(() => {
    wrapper = shallow(
      <TransactionErrorDetailsModal.WrappedComponent {...props} />,
      {
        context: {
          t: (str) => str,
          trackEvent: (e) => e,
        },
      },
    );
  });

  it('shows account details modal', () => {
    const div = wrapper.first();
    expect(div.children()).toHaveLength(7);
    expect(div.childAt(0).name()).toStrictEqual('h3');
    expect(div.find(Tooltip).first().prop('title')).toStrictEqual(
      'copyToClipboard',
    );
    expect(div.find(Tooltip).first().children().prop('onClick')).toBeDefined();
    expect(div.find(Tooltip).children()).toHaveLength(1);
    expect(div.find(Tooltip).first().children()).toHaveLength(1);
    expect(div.find(Copy).prop('size')).toStrictEqual(17);
  });
});
