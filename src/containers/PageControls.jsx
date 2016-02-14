import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import PureRenderMixin from 'react-addons-pure-render-mixin';

import * as modelActions from '../actions/modelActions';
import * as appActions from '../actions/appActions';

export const PageControls = React.createClass({
  mixins: [PureRenderMixin],

  turnNextPage() { this.changePage(true, this.props.totalItemCount) },
  turnPreviousPage() {this.changePage(false, this.props.totalItemCount) },

  changePage(turnForward, totalCount) {
    this.props.dispatch(appActions.turnPage(this.props.viewName, turnForward, totalCount));
  },

  render: function() {
    const {currentPage, itemsInPage} = this.props.pagingState.get(this.props.viewName).toJS();
    const startIndex = currentPage * itemsInPage;
    const endIndex = startIndex + itemsInPage;

    return <div className="paging__controls">
      <button onClick={this.turnPreviousPage} className="paging__previous btn-primary">
        <i className="icon-nuoli-vasen"></i>
      </button>
      <p className="paging__state">
        {startIndex+1} ... {endIndex} ({this.props.totalItemCount} yhteensä)
      </p>
      <button onClick={this.turnNextPage} className="paging__next btn-primary">
        <i className="icon-nuoli-oikea"></i>
      </button>
    </div>;
  }
});


function mapStateToProps(state) {
  return {
    pagingState: state.app.getIn(['paging'])
  };
}

export const PageControlsContainer = connect(
  mapStateToProps
)(PageControls);
