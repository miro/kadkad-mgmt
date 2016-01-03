import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';

import {createPopup, createMessageListener} from '../utils/windowUtils';
import * as actionCreators from '../actions/action_creators';
import * as authService from '../services/auth';


export const LoginView = React.createClass({
  mixins: [PureRenderMixin],
  popupPoller: null,


  componentWillUnmount() {
    this.clearPopupPoller();
  },


  onFbLoginLink() {
    // Create popup window
    // TODO: what dimensions to use? what about mobile devices?
    let handle = createPopup(DAKDAK.baseUrl + '/auth/facebook', 'Kirjaudu sisään', 600, 400);

    // Start polling the popup with events, so the popup will get handle to this window
    this.popupPoller = setInterval(function() {
      console.log('Parent->Child event triggered');
      handle.postMessage('Test ping from parent->child', '*');
    }, 2000);

    // Listen for events from popup window - we should receive auth token from there
    createMessageListener(DAKDAK.baseUrl, this.onPopupEvent);
  },

  onLogoutClick() {
    authService.removeToken();
  },

  onPopupEvent(event) {
    console.log('Message received from popup window');
    if (event.data) {
      authService.setToken(event.data);
      this.clearPopupPoller();
      // TODO: event listener should be removed also?
    }
  },

  clearPopupPoller() {
    // Remove popupPoller, if it is set
    if (this.popupPoller) {
      window.clearInterval(this.popupPoller);
      this.popupPoller = null;
    }
  },


  render() {
    return <div>
        <h2>Login-test</h2>
        <button onClick={this.onFbLoginLink}>Kirjaudu Facebookin kautta</button>
        <button onClick={this.onLogoutClick}>Logout</button>
    </div>;
  }
});

function mapStateToProps(state) {
  return {};
}

export const LoginViewContainer = connect(
  mapStateToProps
)(LoginView);
