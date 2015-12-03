import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';

import * as actionCreators from '../actions/action_creators';
import {Images} from '../components/Images';
import {Persons} from '../components/Persons';



export const EditView = React.createClass({
  mixins: [PureRenderMixin],


  render: function() {
    let { images, persons, dispatch } = this.props;

    return <div>
        <h2>EditView</h2>

        <Images
          images={images}
          dispatch={dispatch}
          {...bindActionCreators(actionCreators, dispatch)} />

        <Persons
          persons={persons}
          dispatch={dispatch}
          {...bindActionCreators(actionCreators, dispatch)} />
    </div>;
  }
});


function getItemArrayFromState(state, itemType) {
  if (state.items.get(itemType)) {
    return state.items.get(itemType).toArray();
  }
  else {
    console.error('Corresponding items from state were not found by itemType', itemType);
    return null;
  }
}


function mapStateToProps(state) {
  return {
    images: state.items.get('images').toArray(),
    persons: state.items.get('persons').toArray()
  };
}


export const EditViewContainer = connect(
  mapStateToProps
)(EditView);
