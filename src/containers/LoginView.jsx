import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';

import {createPopup, createMessageListener} from '../utils/windowUtils';
import * as actionCreators from '../actions/action_creators';


export const LoginView = React.createClass({
  mixins: [PureRenderMixin],

  getInitialState: () => ({ popupHandle: null }),

  testClick() {
    let handle = createPopup('http://localhost:5000/auth/facebook', 'dakdak-auth-popup', 600, 400);
    console.log(handle);

    // ## WIP WIP WIP
    // TODO: close the window on some point
    // TODO: remove event listener after it isn't needed anymore

    setInterval(function() {
      console.log('Parent->Child event triggered');
      handle.postMessage('Test ping from parent->child', '*');
    }, 2000);

    createMessageListener(
      event => console.log('Message received', event.data),
      'http://localhost:5000'); // TODO parameterize
  },

  render() {
    return <div>
        <h2>Login-test</h2>

        <button onClick={this.testClick}>login-test</button>

    </div>;
  }
});

function mapStateToProps(state) {
  return {};
}

export const LoginViewContainer = connect(
  mapStateToProps
)(LoginView);
