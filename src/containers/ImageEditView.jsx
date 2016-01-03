import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';

import * as actionCreators from '../actions/action_creators';
import {ImageList} from '../components/ImageList';
import {Persons} from '../components/Persons';
import {Spots} from '../components/Spots';



export const ImageEditView = React.createClass({
  mixins: [PureRenderMixin],


  render: function() {
    let { images, persons, spots, dispatch } = this.props;

    // TODO paging/filters
    return <div>
        <h2>ImageEditView</h2>

          images={images}
          persons={persons}
          spots={spots}
          dispatch={dispatch}
          {...bindActionCreators(actionCreators, dispatch)} />
      <ImageList
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
