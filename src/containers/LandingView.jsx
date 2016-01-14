import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {InvitationContainer} from './Invitation';


export const LandingView = React.createClass({
  mixins: [PureRenderMixin],

  render() {
    return <div>
        <h2>LandingView</h2>
        <p className="placeholder">Placeholder ländärille</p>

        <InvitationContainer />
    </div>;
  }
});

function mapStateToProps(state) {
  return {};
}

export const LandingViewContainer = connect(
  mapStateToProps
)(LandingView);
