import React, {Component} from 'react';
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
  fields: ['fullName', 'displayName']
})(PersonFormComponent);




export default React.createClass({
  mixins: [PureRenderMixin],

  update(newProps) {
    this.props.updateModel(this.props.person.get('id'), 'persons', newProps);
  },

  toggleEditMode() {
    this.update({ meta: { editMode: !this.props.person.getIn(['meta', 'editMode']) }});
  },

  onFormSubmit(formValues) {
    Object.assign({}, formValues, { meta: { editMode: false }});
    this.update(formValues);
  },


  render: function() {
    let model = this.props.person.toJS();

    if (this.props.person.getIn(['meta', 'editMode'])) {
      let formValues = { fullName: model.fullName, displayName: model.displayName };

      return <div>
        <p>#{model.id}</p>
        <PersonForm
          onSubmit={this.onFormSubmit}
          initialValues={formValues}
          form={'personForm' + model.id} // so that each form will have different store.. is this wrong?
        />
        <button onClick={this.toggleEditMode}>Peruuta</button>
      </div>;
    }
    else {
      return <div>
        <p>#{model.id}</p>
        <p>Koko nimi: {model.fullName}</p>
        <p>Näytettävä nimi: {model.displayName}</p>
        <button onClick={this.toggleEditMode}>edit</button>
      </div>;
    }
  }
});
