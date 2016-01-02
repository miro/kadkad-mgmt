import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {reduxForm} from 'redux-form';
import classNames from 'classnames';


var PersonFormComponent = React.createClass({
  render() {
    const {fields: {fullName, displayName}, handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit} className="form--basic">
        <fieldset>
          <div className="form__group">
            <label>Koko nimi</label>
            <input type="text" placeholder="Koko nimi" {...fullName}/>
          </div>
          <div className="form__group">
            <label>Näytettävä nimi</label>
            <input type="text" placeholder="Näytettävä nimi" {...displayName}/>
          </div>

          <div className="form__controls">
            <button type="submit">Tallenna</button>
            <button onClick={this.toggleEditMode}>Peruuta</button>
          </div>
        </fieldset>
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
      return <div className="person__wrapper card__wrapper card__content">
        <h4 className="card__title">Muokkaa henkilöä</h4>
        <PersonForm
          onSubmit={this.onFormSubmit}
          initialValues={model}
          form={'personForm' + model.id} // so that each form will have different store.. is this wrong?
        />
      </div>;
    }
    else {
      return <div className="person__wrapper card__wrapper card__content">
        <p className="person__infos">
          <span className="person__id">#{model.id}</span>
          <span className="person__display-name">{model.displayName}</span>
          <span className="person__full-name">{model.fullName}</span>
        </p>
        <div className="card__controls">
          <button onClick={this.toggleEditMode} className="person__edit">Muokkaa</button>
        </div>
      </div>;
    }
  }
});
