import React from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import * as app from '../actions/appActions';
import {InvitationContainer} from './Invitation';
import Odometer from '../components/Odometer';


export const LandingView = React.createClass({
  mixins: [PureRenderMixin],

  render() {
    const {kpi} = this.props;

    return <div>
        <h2>LandingView</h2>
        <p className="placeholder">Placeholder ländärille</p>

        <InvitationContainer />

        <div className="kpi__wrapper">
          <Odometer value={kpi.pixelCount} minDigits={12} />
          <Odometer value={kpi.imageCount} minDigits={12} />
        </div>
    </div>;
  }
});

function mapStateToProps(state) {
  return {
    kpi: state.app.getIn(['appState', 'kpi'])
  };
}

export const LandingViewContainer = connect(
  mapStateToProps
)(LandingView);
