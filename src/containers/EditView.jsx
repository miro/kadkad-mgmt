import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import PureRenderMixin from 'react-addons-pure-render-mixin';

import * as modelActions from '../actions/modelActions';
import * as appActions from '../actions/appActions';

import {Spots} from '../components/Spots';
import {Persons} from '../components/Persons';

const VIEW_NAME = 'spotsAndPersonsEditView';

export const EditView = React.createClass({
  mixins: [PureRenderMixin],

  componentDidMount() {
    this.props.dispatch(modelActions.getAllModels('persons'));
    this.props.dispatch(modelActions.getAllModels('spots'));
  },

  render: function() {
    let {persons, spots, tabState, dispatch} = this.props;

    return <div>
      <h2>Henkil&ouml;t &amp; Spotit</h2>

      <button onClick={() => this.props.dispatch(appActions.changeTab(VIEW_NAME, 'persons'))}>Henkilöt</button>
      <button onClick={() => this.props.dispatch(appActions.changeTab(VIEW_NAME, 'spots'))}>Spotit</button>

      {(tabState.currentTab === 'spots') ?
        <Spots
          spots={spots}
          {...bindActionCreators(modelActions, dispatch)}
          dispatch={dispatch} />
      : ''}

      {(tabState.currentTab === 'persons' ?
        <Persons
          persons={persons}
          {...bindActionCreators(modelActions, dispatch)}
          dispatch={dispatch} />
      : '')}
    </div>;
  }
});

function mapStateToProps(state) {
  return {
    tabState: state.app.getIn(['tabs', VIEW_NAME]).toJS(),
    persons: state.models.get('persons').toArray(),
    spots: state.models.get('spots').toArray()
  };
}

export const EditViewContainer = connect(
  mapStateToProps
)(EditView);
