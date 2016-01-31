import React from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import {userLogin, userLogout} from '../actions/appActions';
import {createPopup, createMessageListener} from '../utils/windowUtils';


export const LoginButton = React.createClass({
  mixins: [PureRenderMixin],
  popupPoller: null,

  componentWillUnmount() {
    this.clearPopupPoller();
  },

  onLoginClick(type) {
    // Create popup window
    // TODO: what dimensions to use? what about mobile devices?
    let handle = createPopup(DAKDAK.baseUrl + '/auth/' + type, 'Kirjaudu sisään', 600, 400);

    // Start polling the popup with events, so the popup will get handle to this window
    this.popupPoller = setInterval(function() {
      console.log('Parent->Child event triggered');
      handle.postMessage('Ping from parent->child', '*');
    }, 2000);

    // Listen for events from popup window - we should receive auth token from there
    createMessageListener(DAKDAK.baseUrl, this.onAuthCallback);
  },

  onLogoutClick() {
    this.props.dispatch(userLogout());
  },

  onAuthCallback(event) {
    console.log('Message received from login popup');
    if (event.data) {
      this.clearPopupPoller();
      this.props.dispatch(userLogin(event.data));
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
    const className = 'login-buttons__wrapper';

    if (this.props.loggedIn) {
      return <div className={className}>
        <button className="btn-primary" onClick={this.onLogoutClick}>
          <i className="icon-exit"></i> Logout
        </button>
      </div>;
    } else {
      return <div className={className}>
        <button className="btn-primary" onClick={() => this.onLoginClick('facebook')}>
          <i className="icon-facebook"></i> Kirjaudu Facebookin kautta
        </button>
        <button className="btn-primary" onClick={() => this.onLoginClick('google')}>
          <i className="icon-google"></i> Kirjaudu Googlen kautta
        </button>
      </div>;
    }
  }
});

function mapStateToProps(state) {
  return {
    loggedIn: state.app.getIn(['user', 'loggedIn'])
  };
}

export const LoginButtonContainer = connect(
  mapStateToProps
)(LoginButton);
