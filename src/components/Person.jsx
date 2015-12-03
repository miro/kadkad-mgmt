import React, {Component} from 'react';
import {connect} from 'react-redux';

import PureRenderMixin from 'react-addons-pure-render-mixin';
import {reduxForm} from 'redux-form';
import classNames from 'classnames';




var PersonFormComponent = React.createClass({
  render() {
    const {fields: {fullName, displayName}, handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Koko nimi</label>
          <input type="text" placeholder="Koko nimi" {...fullName}/>
        </div>
        <div>
          <label>Näytettävä nimi</label>
          <input type="text" placeholder="Näytettävä nimi" {...displayName}/>
        </div>
        <button type="submit" onClick={this.handleSubmit}>Tallenna</button>
      </form>
    );
  }
});
var PersonForm = reduxForm({
  form: 'personForm',
  fields: ['fullName', 'displayName']
})(PersonFormComponent);




export default React.createClass({
  mixins: [PureRenderMixin],

  getInitialState: () => { return { editMode: false } },

  update(newProps) {
    this.props.updateModel(this.props.person.get('id'), 'persons', newProps);
  },


  render: function() {
    let model = this.props.person.toJS();

    if (model.meta && model.meta.editMode) {
      let formValues = { fullName: model.fullName, displayName: model.displayName };

      return <div>
        <p>#{model.id}</p>
        <PersonForm
          onSubmit={(formValues) => {
            Object.assign(formValues, {meta: {editMode: false}});
            this.update(formValues);
          }}
          initialValues={formValues}
          form={'personForm' + model.id} // so that each form will have different store.. is this wrong?
        />
        <button onClick={this.toggleEditMode}>cancel</button>
      </div>;
    }
    else {
      return <div>
        <p>#{model.id}</p>
        <p>Koko nimi: {model.fullName}</p>
        <p>Näytettävä nimi: {model.displayName}</p>
        <button onClick={() => {
          this.update({ meta: { editMode: true }});
        }}>edit</button>
      </div>;
    }
  }
});
