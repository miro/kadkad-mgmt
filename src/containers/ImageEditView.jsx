import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import PureRenderMixin from 'react-addons-pure-render-mixin';

import * as modelActions from '../actions/modelActions';
import * as appActions from '../actions/appActions';

import {ImageList} from '../components/ImageList';

// NOTE: do we need filters in here..?

const VIEW_NAME = 'imageEditView';

export const ImageEditView = React.createClass({
  mixins: [PureRenderMixin],

  getInitialState: () => ({ page: 0, itemsInPage: 10 }),

  componentDidMount() {
    this.props.dispatch(modelActions.getAllModels('images'));
    this.props.dispatch(modelActions.getAllModels('persons'));
    this.props.dispatch(modelActions.getAllModels('spots'));
  },

  // page related functions
  turnNextPage() { this.changePage(true, this.props.totalImagesCount) },
  turnPreviousPage() {this.changePage(false, this.props.totalImagesCount) },
  changePage(turnForward, totalCount) {
    this.props.dispatch(appActions.turnPage(VIEW_NAME, turnForward, totalCount));
  },

  render: function() {
    const {imagesOnThisPage, persons, spots, startIndex, endIndex, totalImagesCount, dispatch} = this.props;

    const pagingControls = <div className="paging__controls">
      <button onClick={this.turnPreviousPage} className="paging__previous btn-primary">
        <i className="icon-nuoli-vasen"></i>
      </button>
      <p className="paging__state">
        {startIndex+1} ... {endIndex} ({totalImagesCount} kuvaa yhteensä)
      </p>
      <button onClick={this.turnNextPage} className="paging__next btn-primary">
        <i className="icon-nuoli-oikea"></i>
      </button>
    </div>;


    return (imagesOnThisPage.length > 0) ?
    <div>
      <h2 className="view__title">
        <i className="icon-kuvat"></i> Kuvat
      </h2>

      {pagingControls}
      <ImageList
        images={imagesOnThisPage}
        persons={persons}
        spots={spots}
        dispatch={dispatch}
        {...bindActionCreators(modelActions, dispatch)} />
      {pagingControls}

    </div> :
    <p>Ei vielä yhtään kuvaa - uploadaa jotain!</p>
  }
});


function mapStateToProps(state) {
  const images = state.models.get('images').toArray();

  const {currentPage, itemsInPage} = state.app.getIn(['paging', VIEW_NAME]).toJS();
  const startIndex = currentPage * itemsInPage;
  const endIndex = startIndex + itemsInPage;

  return {
    imagesOnThisPage: images.slice(startIndex, endIndex),
    totalImagesCount: images.length,
    startIndex,
    endIndex,

    persons: state.models.get('persons').toArray(),
    spots: state.models.get('spots').toArray()
  };
}


export const ImageEditViewContainer = connect(
  mapStateToProps
)(ImageEditView);
