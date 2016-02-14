import React from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import {setData} from '../actions/appActions';


export const TEXT_FILTER_KEY = 'textFilter';

export const ImageFilters = React.createClass({
  mixins: [PureRenderMixin],

  handleInputChange(event) {
    // TODO: throttle

    this.props.onFiltersChange ? this.props.onFiltersChange() : null;

    let payload = {};
    payload[TEXT_FILTER_KEY] = event.target.value;

    this.props.dispatch(setData(this.props.viewName, payload));
  },

  render: function() {
    return (
      <input
        type="text"
        onChange={this.handleInputChange}
        placeholder="Hakusana" />
    );
  }
});


function mapStateToProps(state) {
  return {
    appState: state.app
  };
}

export const ImageFiltersContainer = connect(
  mapStateToProps
)(ImageFilters);
