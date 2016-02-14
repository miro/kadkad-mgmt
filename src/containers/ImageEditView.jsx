import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import PureRenderMixin from 'react-addons-pure-render-mixin';

import * as modelActions from '../actions/modelActions';
import * as appActions from '../actions/appActions';

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

  render: function() {
    const {imagesOnThisPage, persons, spots, startIndex, endIndex, totalImagesCount, dispatch} = this.props;

    if (imagesOnThisPage.length > 0) {
      return <div>
        <h2 className="view__title">
          <i className="icon-kuvat"></i> Kuvien tietojen muokkaus
        </h2>

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
