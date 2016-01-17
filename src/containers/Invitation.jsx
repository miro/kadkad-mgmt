import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import PureRenderMixin from 'react-addons-pure-render-mixin';

import StatusCard from '../components/StatusCard';

import * as app from '../actions/appActions';

export const Invitation = React.createClass({
  mixins: [PureRenderMixin],

  getInitialState: () => ({ invitationCode: '' }),

  handleInvitationSend() {
    this.props.dispatch(app.challengeInvitationCode(this.state.invitationCode));
  },

  handleInputChange(event) {
    this.setState({ invitationCode: event.target.value });
  },

  render: function() {
    console.log(this.props.hasUsedInvitation);

    if (this.props.hasUsedInvitationDuringThisSession) {
      return <StatusCard
              type="success"
              icon="palkinto"
              title="Kutsu lunastettu onnistuneesti"
              message="Ei kun sekoilemaan!" />;
    }
    else if (this.props.hasUsedInvitation) {
      return null;
    }
    else {
      return <div className="invitation__wrapper">
        <h2>Saitko kutsukoodin?</h2>
        <p>Syötä se tähän, niin pääset muokkaamaan Spotteja ja Henkilöitä</p>
        <input
          type="text"
          onChange={this.handleInputChange}
          disabled={this.props.hasNoMoreTriesLeft}
          placeholder="Kutsukoodisi" />
        <button
          className="btn-primary"
          onClick={this.handleInvitationSend}
          disabled={this.props.hasNoMoreTriesLeft}
        >
          <i className="icon-nuoli-oikea"></i>
        </button>

        {this.props.errorMessage ?
          <StatusCard
            type="error"
            icon="varoitus"
            title="Virhe"
            message={this.props.errorMessage} />
          : ''}
      </div>;
    }
  }
});

function mapStateToProps(state) {
  return {
    hasUsedInvitationDuringThisSession: state.app.getIn(['flags', app.INVITATION_REDEEMED_FLAG]),
    hasUsedInvitation: state.app.getIn(['user', 'profile', 'invitationId']),
    hasNoMoreTriesLeft: state.app.getIn(['flags', app.INVITATION_NO_MORE_TRIES_LEFT_FLAG]),
    errorMessage: state.app.getIn(['appState', app.INVITATION_ERROR_MESSAGE])
  };
}

export const InvitationContainer = connect(
  mapStateToProps
)(Invitation);
