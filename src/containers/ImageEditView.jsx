import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import PureRenderMixin from 'react-addons-pure-render-mixin';

import * as modelActions from '../actions/modelActions';
import * as appActions from '../actions/appActions';

import {imageFilter} from '../services/filter';

import {ImageFiltersContainer, TEXT_FILTER_KEY} from './ImageFilters';
import {PageControlsContainer} from './PageControls';
import {ImageList} from '../components/ImageList';

// TODO: show loading indicator instead of "no images, upload some" -text if first fetch isn't ready yet
// TODO: add "back to top" -button

const VIEW_NAME = 'imageEditView';

export const ImageEditView = React.createClass({
  mixins: [PureRenderMixin],

  componentDidMount() {
    this.props.dispatch(modelActions.getAllModels('images'));
    this.props.dispatch(modelActions.getAllModels('persons'));
    this.props.dispatch(modelActions.getAllModels('spots'));
  },

  handleFiltersChange() {
    console.log('changed!');
    this.props.dispatch(appActions.resetPage(VIEW_NAME));
  },

  getFilteredImages() {
    const filteringString = this.props.viewState[TEXT_FILTER_KEY];
    return imageFilter(this.props.allImages, filteringString);
  },

  getImagesOnCurrentPage(filteredImages) {
    const {currentPage, itemsInPage} = this.props.pagingState;
    const startIndex = currentPage * itemsInPage;
    const endIndex = startIndex + itemsInPage;

    return filteredImages.slice(startIndex, endIndex);
  },

  render: function() {
    const {persons, spots, dispatch} = this.props;

    const filteredImages = this.getFilteredImages();
    const imagesOnThisPage = this.getImagesOnCurrentPage(filteredImages);

    const totalImagesCount = filteredImages.length;


    if (this.props.allImages.length > 0) {
      return <div>
        <h2 className="view__title">
          <i className="icon-kuvat"></i> Kuvien tietojen muokkaus
        </h2>


        <ImageFiltersContainer
          viewName={VIEW_NAME}
          onFiltersChange={this.handleFiltersChange} />

        <PageControlsContainer
          viewName={VIEW_NAME}
          totalItemCount={totalImagesCount}
        />

        <ImageList
          images={imagesOnThisPage}
          persons={persons}
          spots={spots}
          dispatch={dispatch}
          {...bindActionCreators(modelActions, dispatch)} />

        <PageControlsContainer
          viewName={VIEW_NAME}
          totalItemCount={totalImagesCount}
        />
      </div>;
    }
    else {
      return <div>
        <p>Ei vielä yhtään kuvaa - uploadaa jotain!</p>
      </div>;
    }
  }
});


function mapStateToProps(state) {
  return {
    viewState: state.app.getIn(['appState', VIEW_NAME]),
    pagingState: state.app.getIn(['paging', VIEW_NAME]).toJS(),

    allImages: state.models.get('images').toArray(),
    persons: state.models.get('persons').toArray(),
    spots: state.models.get('spots').toArray()
  };
}


export const ImageEditViewContainer = connect(
  mapStateToProps
)(ImageEditView);
