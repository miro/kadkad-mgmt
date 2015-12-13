import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';

import Person from './Person';


export const Persons = React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    let personComponents = [];
    this.props.persons.map(person => {
      personComponents.push(
        <Person
          updateModel={this.props.updateModel}
          person={person}
          key={person.get('id')}
        />
      );
    });

    return <div>
        <h2>Persons</h2>
        <button onClick={() => this.props.createModel('persons')}>Luo Henkilö</button>
        <div className="persons__list">
          {personComponents}
        </div>
    </div>;
  }
});
