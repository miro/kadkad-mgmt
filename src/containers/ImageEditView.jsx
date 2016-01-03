import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import PureRenderMixin from 'react-addons-pure-render-mixin';

import * as actionCreators from '../actions/action_creators';
import {ImageList} from '../components/ImageList';

// NOTE: do we need filters in here..?

export const ImageEditView = React.createClass({
  mixins: [PureRenderMixin],

  getInitialState: () => ({ page: 0, itemsInPage: 10 }),

  // page related functions
  turnNextPage() { this.changePage(true, this.props.images.length) },
  turnPreviousPage() {this.changePage(false, this.props.images.length) },
  changePage(turnForward, totalCount) {
    let newPageNumber = (turnForward) ? this.state.page + 1 : this.state.page - 1;

    // check that page doesn't underflow (is that a term?)
    newPageNumber = (newPageNumber < 0) ? 0 : newPageNumber;

    // check that page doesn't overflow
    let lastIndexOnNewPage = newPageNumber * this.state.itemsInPage;
    if (lastIndexOnNewPage <= totalCount) {
      // NOTE this might have an error. too tired to check thoroughly now
      this.setState({ page: newPageNumber });
    }
  },

  render: function() {
    const {images, persons, spots, dispatch} = this.props;
    const {page, itemsInPage} = this.state

    const startIndex = page * itemsInPage;
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
        {...bindActionCreators(actionCreators, dispatch)} />
    </div>;
  }
});


function mapStateToProps(state) {
  return {
    images: state.models.get('images').toArray(),
    persons: state.models.get('persons').toArray(),
    spots: state.models.get('spots').toArray()
  };
}


export const ImageEditViewContainer = connect(
  mapStateToProps
)(ImageEditView);
