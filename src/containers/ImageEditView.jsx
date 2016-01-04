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
  turnNextPage() { this.changePage(true, this.props.images.length) },
  turnPreviousPage() {this.changePage(false, this.props.images.length) },
  changePage(turnForward, totalCount) {
    this.props.dispatch(appActions.turnPage(VIEW_NAME, turnForward, totalCount));
  },

  render: function() {
    const {images, persons, spots, dispatch} = this.props;
    const {currentPage, itemsInPage} = this.props.paging.toJS();

    const startIndex = currentPage * itemsInPage;
    const endIndex = startIndex + itemsInPage;

    const imagesOnThisPage = images.slice(startIndex, endIndex);
    const totalImagesCount = images.length;

    return <div>
      <h2>Kuvat</h2>

      <div className="paging__controls">
        <button onClick={this.turnPreviousPage} className="paging__previous">
          Edelliset
        </button>
        <p className="paging__state">
          {startIndex+1} ... {endIndex} ({totalImagesCount} kuvaa yhteensä)
        </p>
        <button onClick={this.turnNextPage} className="paging__next">
          Seuraavat
        </button>
      </div>

      <ImageList
        images={imagesOnThisPage}
        persons={persons}
        spots={spots}
        dispatch={dispatch}
        {...bindActionCreators(modelActions, dispatch)} />
    </div>;
  }
});


function mapStateToProps(state) {
  return {
    paging: state.app.getIn(['paging', VIEW_NAME]),

    images: state.models.get('images').toArray(),
    persons: state.models.get('persons').toArray(),
    spots: state.models.get('spots').toArray()
  };
}


export const ImageEditViewContainer = connect(
  mapStateToProps
)(ImageEditView);
