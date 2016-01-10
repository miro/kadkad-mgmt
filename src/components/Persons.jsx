import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';

import Person from './Person';
import PersonForm from '../components/PersonForm';

import * as modelActions from '../actions/modelActions';


export const Persons = React.createClass({
  mixins: [PureRenderMixin],

  getInitialState: () => ({ createMode: false}),

  toggleCreateMode(e) {
    e ? e.preventDefault() : '';
    this.setState({ createMode: !this.state.createMode });
  },

  onCreateFormSubmit(props) {
    this.props.dispatch(modelActions.createModel('persons', props));
    this.toggleCreateMode();
  },

  render: function() {
    return <div>
      <button onClick={this.toggleCreateMode} className="btn-primary">
        Luo Henkilö
      </button>
      {this.state.createMode ?
        <PersonForm
          onSubmit={(props) => this.onCreateFormSubmit(props)}
          onCancel={this.toggleCreateMode}
          initialValues={{}}
          formKey={'personForm-create'} />
       : ''}

      {this.props.persons.map(person => {
        return <Person
          updateModel={this.props.updateModel}
          person={person}
          key={person.get('id')} />;
      })}
    </div>;
  }
});
