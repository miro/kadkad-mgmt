import React from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import {setData} from '../actions/appActions';


export const TEXT_FILTER_KEY = 'textFilter';
export const SHOW_ONLY_INCOMPLETE_KEY = 'showOnlyIncomplete'; // argh, naming things...

export const ImageFilters = React.createClass({
  mixins: [PureRenderMixin],

  handleFilterStringChange(event) {
    // TODO: throttle
    this.props.dispatch(setData([this.props.viewName, TEXT_FILTER_KEY], event.target.value));
    this.props.onFiltersChange();
  },

  handleButtonClick() {
    // Toggle current value
    const currentValue = this.props.appState.getIn([this.props.viewName, SHOW_ONLY_INCOMPLETE_KEY]);
    this.props.dispatch(setData([this.props.viewName, SHOW_ONLY_INCOMPLETE_KEY], !currentValue));

    this.props.onFiltersChange();
  },

  render: function() {
    return (
      <div className="image-filters__wrapper">
        <input
          type="text"
          onChange={this.handleFilterStringChange}
          placeholder="Filtteröi..." />

        <button onClick={this.handleButtonClick}>Näytä vain näytä vain</button>
      </div>
    );
  }
});


function mapStateToProps(state) {
  return {
    appState: state.app.get('appState')
  };
}

export const ImageFiltersContainer = connect(
  mapStateToProps
)(ImageFilters);
