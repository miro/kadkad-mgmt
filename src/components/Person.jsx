import React from 'react';
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

  getInitialState: () => ({ editMode: false }),

  update(newProps) {
    this.props.updateModel(this.props.person.get('id'), 'persons', newProps);
  },

  toggleEditMode() {
    this.setState({ editMode: !this.state.editMode });
  },

  onFormSubmit(formValues) {
    this.update(formValues);
    this.toggleEditMode();
  },


  render: function() {
    let model = this.props.person.toJS();

    if (this.state.editMode) {
      return <div>
        <p>#{model.id}</p>
        <PersonForm
          onSubmit={this.onFormSubmit}
          initialValues={model}
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
