import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import PureRenderMixin from 'react-addons-pure-render-mixin';

import * as actionCreators from '../actions/action_creators';
import {Persons} from '../components/Persons';
import {Spots} from '../components/Spots';



export const EditView = React.createClass({
  mixins: [PureRenderMixin],

  componentDidMount() {
    this.props.dispatch(actionCreators.getAllModels('persons'));
    this.props.dispatch(actionCreators.getAllModels('spots'));
  },

  render: function() {
    let { images, persons, spots, dispatch } = this.props;

    return <div>
        <h2>EditView</h2>

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
    images: state.models.get('images').toArray(),
    persons: state.models.get('persons').toArray(),
    spots: state.models.get('spots').toArray()
  };
}

export const EditViewContainer = connect(
  mapStateToProps
)(EditView);
