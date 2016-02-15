import React from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import _ from 'lodash';

import {setData} from '../actions/appActions';
import {imageFilter} from '../services/filter';

import ToggleButton from '../components/ToggleButton';

export const IMAGE_FILTER_STATE = 'imageFilterState';

export const FILTERS_SET_KEY = 'filtersInitialized';
export const TEXT_FILTER_KEY = 'textFilter';
export const SHOW_ONLY_INCOMPLETE_KEY = 'showOnlyIncomplete'; // argh, naming things...
export const FILTERED_IMAGE_IDS = 'filteredImagesIds';

export const ImageFilters = React.createClass({
  mixins: [PureRenderMixin],

  handleFilterStringChange(event) {
    // TODO: throttle

    let payload = {};
    payload[TEXT_FILTER_KEY] = event.target.value;
    this.handleFiltersChanged(payload);
  },

  handleIncompleteClick() {
    const currentValue = this.props.appState.getIn([this.props.viewName, IMAGE_FILTER_STATE, SHOW_ONLY_INCOMPLETE_KEY]);

    let payload = {};
    payload[SHOW_ONLY_INCOMPLETE_KEY] = !currentValue;
    this.handleFiltersChanged(payload);
  },

  handleFiltersChanged(newFilters) {
    let filteringState = this.props.appState.getIn([this.props.viewName, IMAGE_FILTER_STATE]).toJS();

    _.merge(filteringState, newFilters);

    const filteredImageIds = _.map(imageFilter(this.props.allImages, filteringState), image => image.get('id'));

    filteringState[FILTERED_IMAGE_IDS] = filteredImageIds;
    filteringState[FILTERS_SET_KEY] = true;

    this.props.dispatch(setData([this.props.viewName, IMAGE_FILTER_STATE], filteringState));

    // Let parent know that filters were changed
    this.props.onFiltersChange();
  },

  render: function() {
    const showOnlyIncomplete = this.props.appState.getIn([this.props.viewName, IMAGE_FILTER_STATE, SHOW_ONLY_INCOMPLETE_KEY]);

    return <section className="image-filters__wrapper">
      <h4 className="image-filters__title">Hakuehdot</h4>

      <div className="image-filters__inputs-container">
        <input
          className="image-filters__text-input"
          type="text"
          onChange={this.handleFilterStringChange}
          placeholder="Hakusana" />

        <ToggleButton
          className="image-filters__toggle"
          handleClick={this.handleIncompleteClick}
          caption="Näytä vain täyttämättömät"
          isActive={showOnlyIncomplete} />
      </div>
    </section>;
  }
});


function mapStateToProps(state) {
  return {
    appState: state.app.get('appState'),
    allImages: state.models.get('images').toArray()
  };
}

export const ImageFiltersContainer = connect(
  mapStateToProps
)(ImageFilters);
