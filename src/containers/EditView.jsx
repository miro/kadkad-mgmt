import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import PureRenderMixin from 'react-addons-pure-render-mixin';

import * as modelActions from '../actions/modelActions';

import {Persons} from '../components/Persons';
import {Spots} from '../components/Spots';
import PersonForm from '../components/PersonForm';
import SpotForm from '../components/SpotForm';


export const EditView = React.createClass({
  mixins: [PureRenderMixin],

  getInitialState: () => ({ createMode: { persons: false, spots: false }}),

  componentDidMount() {
    this.props.dispatch(modelActions.getAllModels('persons'));
    this.props.dispatch(modelActions.getAllModels('spots'));
  },

  toggleCreateMode(type) {
    let deltaObject = { createMode: {} };
    deltaObject.createMode[type] = !this.state.createMode[type]
    this.setState(deltaObject);
  },
  togglePersonCreateMode(e) {
    e ? e.preventDefault() : '';
    this.toggleCreateMode('persons')
  },
  toggleSpotCreateMode(e) {
    e ? e.preventDefault() : '';
    this.toggleCreateMode('spots')
  },

  onCreateFormSubmit(type, props) {
    this.props.dispatch(modelActions.createModel(type, props));
    this.toggleCreateMode(type);
  },

  render: function() {
    let {images, persons, spots, dispatch} = this.props;

    return <div>
        <h2>Henkil&ouml;t &amp; Spotit</h2>

        <button onClick={this.togglePersonCreateMode} className="btn-primary">
          Luo Henkilö
        </button>
        {this.state.createMode.persons ?
          <PersonForm
            onSubmit={(props) => this.onCreateFormSubmit('persons', props)}
            onCancel={this.togglePersonCreateMode}
            initialValues={{}}
            formKey={'personForm-create'} />
         : ''}

        <Persons
          persons={persons}
          dispatch={dispatch}
          {...bindActionCreators(modelActions, dispatch)} />



        <button onClick={this.toggleSpotCreateMode} className="btn-primary">
          Luo Spotti
        </button>
        {this.state.createMode.spots ?
          <SpotForm
            onSubmit={(props) => this.onCreateFormSubmit('spots', props)}
            onCancel={this.toggleSpotCreateMode}
            initialValues={{}}
            formKey={'spotForm-create'} />
         : ''}

        <Spots
          spots={spots}
          dispatch={dispatch}
          {...bindActionCreators(modelActions, dispatch)} />
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
