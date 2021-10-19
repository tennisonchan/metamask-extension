import React from 'react';
import Tooltip from '../../../ui/tooltip';
import Button from '../../../ui/button'
import Copy from '../../../ui/icon/copy-icon.component';
import TransactionErrorDetailsModal from './transaction-error-details';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { mountWithRouter } from '../../../../../test/lib/render-helpers';
import { act } from '@testing-library/react';

describe('Transaction Error Details Modal', () => {
  let wrapper;

  const mockStore = {
    metamask: {
      provider: {
        type: 'test',
      }
    },
    copied: false
  };

  // needed for clipboard
  window.prompt = jest.fn();

  const store = configureMockStore()(mockStore);
  const props = {
    network: 'test',
    message: `[ethjs-query] while formatting outputs from RPC '{"value":{"code":-32000,"message":"intrinsic gas too low"}}'`,
  };

  beforeEach(() => {
    wrapper = mountWithRouter(
      <Provider store={store}>
        <TransactionErrorDetailsModal.WrappedComponent {...props} />
      </Provider>,
      store
    );
  });

  it('shows account details modal', () => {
    const div = wrapper.find(".transaction-error-details__main");
    expect(div.children()).toHaveLength(4);
    expect(div.childAt(0).name()).toStrictEqual('div');
    const tooltip = div.find(Tooltip);
    expect(tooltip.first().prop('title')).toStrictEqual(
      "[copyToClipboard]",
    );
    expect(tooltip.children()).toHaveLength(1);
    expect(tooltip.first().children()).toHaveLength(1);
    expect(div.find(Copy).prop('size')).toStrictEqual(17);

    const h2 = div.find(".transaction-error-details__header__title").childAt(0);
    expect(h2.prop('children')).toStrictEqual("[details]");

    const copyButton = tooltip.find(Button);
    expect(copyButton).toBeDefined();
    expect(copyButton).toHaveLength(1);
    const mockCopyEvent = { preventDefault: jest.fn() } 
    act(() => copyButton.prop('onClick')(mockCopyEvent));  

    const closeButton = div.find(".popover-header__button");
    expect(closeButton).toBeDefined();
    expect(closeButton).toHaveLength(1);
    const mockCloseEvent = { preventDefault: jest.fn() } 
    act(() => closeButton.prop('onClick')(mockCloseEvent));      
  });
});