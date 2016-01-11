import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import PureRenderMixin from 'react-addons-pure-render-mixin';

import * as modelActions from '../actions/modelActions';
import * as appActions from '../actions/appActions';

import List from '../components/List';

const VIEW_NAME = 'spotsAndPersonsEditView';

export const EditView = React.createClass({
  mixins: [PureRenderMixin],

  componentDidMount() {
    this.props.dispatch(modelActions.getAllModels('persons'));
    this.props.dispatch(modelActions.getAllModels('spots'));
  },

  render: function() {
    let {items, tabState, dispatch} = this.props;

    return <div>
      <h2>Henkil&ouml;t &amp; Spotit</h2>

      <button onClick={() => this.props.dispatch(appActions.changeTab(VIEW_NAME, 'persons'))}>Henkilöt</button>
      <button onClick={() => this.props.dispatch(appActions.changeTab(VIEW_NAME, 'spots'))}>Spotit</button>

      <List
        itemType={tabState.currentTab}
        items={items}
        {...bindActionCreators(modelActions, dispatch)}
        dispatch={dispatch} />
    </div>;
  }
});

function mapStateToProps(state) {
  const tabState = state.app.getIn(['tabs', VIEW_NAME]).toJS();
  const items = state.models.get(tabState.currentTab).toArray();

  return {
    tabState,
    items
  };
}

export const EditViewContainer = connect(
  mapStateToProps
)(EditView);
