import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import _ from 'lodash';

import * as modelActions from '../actions/modelActions';
import * as appActions from '../actions/appActions';

import {imageFilter} from '../services/filter';

import {ImageFiltersContainer, IMAGE_FILTER_STATE, FILTERED_IMAGE_IDS, FILTERS_SET_KEY} from './ImageFilters';
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

  getImagesOnCurrentPage(filteredImageIds) {
    const {currentPage, itemsInPage} = this.props.pagingState;
    const startIndex = currentPage * itemsInPage;
    const endIndex = startIndex + itemsInPage;

    var imagesList = [];

    if (this.props.filtersSet) {
      imagesList = _.filter(this.props.allImages, image => {
        return _.find(filteredImageIds, imageId => imageId === image.get('id'));
      });
    } else {
      imagesList = this.props.allImages;
    }

    return imagesList.slice(startIndex, endIndex);
  },

  handleFiltersChange() {
    // filters were changed -> reset paging to zero
    this.props.dispatch(appActions.resetPage(VIEW_NAME));
  },

  render: function() {
    const {persons, spots, dispatch, filteredImageIds} = this.props;

    const totalImagesCount = filteredImageIds.length;
    const imagesOnThisPage = this.getImagesOnCurrentPage(filteredImageIds);

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
          totalItemCount={totalImagesCount} />

        {!this.props.filtersSet || filteredImageIds.length > 0 ?
          <ImageList
            images={imagesOnThisPage}
            persons={persons}
            spots={spots}
            dispatch={dispatch}
            {...bindActionCreators(modelActions, dispatch)} />
          :
          <div>
            <p>Ei osumia - höllennä hakuehtojasi</p>
          </div>
        }

        <PageControlsContainer
          viewName={VIEW_NAME}
          totalItemCount={totalImagesCount} />
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
    spots: state.models.get('spots').toArray(),

    filtersSet: state.app.getIn(['appState', VIEW_NAME, IMAGE_FILTER_STATE, FILTERS_SET_KEY]),
    filteredImageIds: state.app.getIn(['appState', VIEW_NAME, IMAGE_FILTER_STATE, FILTERED_IMAGE_IDS]).toArray()
  };
}


export const ImageEditViewContainer = connect(
  mapStateToProps
)(ImageEditView);
