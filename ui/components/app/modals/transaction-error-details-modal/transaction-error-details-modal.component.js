import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from '@material-ui/core';
import copyToClipboard from 'copy-to-clipboard';
import Copy from '../../../ui/icon/copy-icon.component';

export default class TransactionDetailsModal extends Component {
  state = {
    copied: false,
  };

  static contextTypes = {
    t: PropTypes.func,
  };

  static propTypes = {
    message: PropTypes.string,
  };

  componentDidMount() {
    this.copyTimeout = null;
  }

  componentWillUnmount() {
    if (this.copyTimeout) {
      clearTimeout(this.copyTimeout);
      this.copyTimeout = null;
    }
  }

  render() {
    const { message } = this.props;

    // find the json part and remove the '
    const jsonPart = message
      .substr(message.indexOf("'"))
      .substring(1)
      .slice(0, -1);
    const heading = message.substring(0, message.indexOf("'"));
    const object = JSON.parse(jsonPart);
    const formattedString = JSON.stringify(object, null, 2);

    return (
      <div style={{ padding: '5px', margin: '5px' }}>
        <h3>{this.context.t('details')}</h3>
        <hr />
        <p>{heading}</p>
        <br />
        <pre>{formattedString}</pre>
        <br />
        <Tooltip
          position="bottom"
          title={
            this.state.copied
              ? this.context.t('copiedExclamation')
              : this.context.t('copyToClipboard')
          }
        >
          <div
            onClick={() => {
              this.setState({ copied: true });
              setTimeout(() => this.setState({ copied: false }), 3000);
              copyToClipboard(message);
            }}
          >
            <Copy size={17} color="#3098DC" />{' '}
            {this.context.t('copyRawTransactionData')}
          </div>
        </Tooltip>
      </div>
    );
  }
}
