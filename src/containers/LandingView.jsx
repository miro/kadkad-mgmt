import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';

import * as actionCreators from '../actions/action_creators';


export const LandingView = React.createClass({
  mixins: [PureRenderMixin],

  render() {
    return <div>
        <h2>LandingView</h2>
        <p className="placeholder">Placeholder ländärille</p>
    </div>;
  }
});

function mapStateToProps(state) {
  return {};
}

export const LandingViewContainer = connect(
  mapStateToProps
)(LandingView);
