import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';

import Person from './Person';


export const Persons = React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    return <div>
        <h2>Henkilöt</h2>
        <button
          onClick={() => this.props.createModel('persons')}
          className="btn-primary">
          Luo Henkilö
        </button>

        <div className="persons__list">
          {this.props.persons.map(person => {
            return <Person
              updateModel={this.props.updateModel}
              person={person}
              key={person.get('id')} />
          })}
        </div>
    </div>;
  }
});
