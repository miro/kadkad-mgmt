import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import PureRenderMixin from 'react-addons-pure-render-mixin';

import StatusCard from '../components/StatusCard';

import * as app from '../actions/appActions';

export const InvitationCard = React.createClass({
  mixins: [PureRenderMixin],

  getInitialState: () => ({ invitationCode: '' }),

  handleInvitationSend() {
    this.props.dispatch(app.challengeInvitationCode(this.state.invitationCode));
  },

  handleInputChange(event) {
    this.setState({ invitationCode: event.target.value });
  },

  render: function() {
    if (!this.props.loggedIn) {
      return null;
    }
    else if (this.props.hasUsedInvitationDuringThisSession) {
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
      return <div className="card__wrapper invitation__wrapper">
        <h3 className="card__purpose">Kutsukoodihommat</h3>
        <div className="card__content">
          <p><strong>Saitko jostain kutsukoodin?</strong> Syötä se tähän, niin pääset luomaan &amp; muokkaamaan Spotteja ja Henkilöitä, sekä muokkaamaan kuvia joita Sinun TIIMI on lähettänyt</p>

          <input
            type="text"
            onChange={this.handleInputChange}
            disabled={this.props.hasNoMoreTriesLeft}
            placeholder="Kutsukoodisi" />
          <button
            className="btn-primary"
            onClick={this.handleInvitationSend}
            disabled={this.props.hasNoMoreTriesLeft}
          ><i className="icon-nuoli-oikea"></i></button>

          {this.props.errorMessage ?
            <StatusCard
              type="error"
              icon="varoitus"
              title="Virhe"
              message={this.props.errorMessage} />
            : ''}
        </div>
      </div>;
    }
  }
});

function mapStateToProps(state) {
  return {
    loggedIn: state.app.getIn(['user', 'loggedIn']),
    hasUsedInvitationDuringThisSession: state.app.getIn(['flags', app.INVITATION_REDEEMED_FLAG]),
    hasUsedInvitation: state.app.getIn(['user', 'profile', 'invitationId']),
    hasNoMoreTriesLeft: state.app.getIn(['flags', app.INVITATION_NO_MORE_TRIES_LEFT_FLAG]),
    errorMessage: state.app.getIn(['appState', app.INVITATION_ERROR_MESSAGE])
  };
}

export const InvitationCardContainer = connect(
  mapStateToProps
)(InvitationCard);
