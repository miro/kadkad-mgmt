import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';

import * as actionCreators from '../actions/action_creators';
import {Images} from '../components/Images';
import {Persons} from '../components/Persons';
import {Spots} from '../components/Spots';



export const EditView = React.createClass({
  mixins: [PureRenderMixin],


  render: function() {
    let { images, persons, spots, dispatch } = this.props;

    return <div>
        <h2>EditView</h2>

        <Images
          images={images}
          persons={persons}
          dispatch={dispatch}
          {...bindActionCreators(actionCreators, dispatch)} />

        <Persons
          persons={persons}
          dispatch={dispatch}
          {...bindActionCreators(actionCreators, dispatch)} />

        <Spots
          spots={spots}
          dispatch={dispatch}
          {...bindActionCreators(actionCreators, dispatch)} />
    </div>;
  }
});


function mapStateToProps(state) {
  return {
    images: state.items.get('images').toArray(),
    persons: state.items.get('persons').toArray(),
    spots: state.items.get('spots').toArray()
  };
}


export const EditViewContainer = connect(
  mapStateToProps
)(EditView);
