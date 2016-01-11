import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import PersonForm from './PersonForm';


export default React.createClass({
  mixins: [PureRenderMixin],

  getInitialState: () => ({ editMode: false }),

  update(newProps) {
    this.props.updateModel(this.props.model.get('id'), 'persons', newProps);
  },

  toggleEditMode(e) {
    // if this triggered through react-form, there is an event object as parameter.
    // in that case preventDefault from it!
    e ? e.preventDefault() : '';
    this.setState({ editMode: !this.state.editMode });
  },

  onFormSubmit(formValues) {
    this.update(formValues);
    this.toggleEditMode();
  },

  render: function() {
    let model = this.props.model.toJS();

    if (this.state.editMode) {
      return <div className="person__wrapper card__wrapper">
        <h3 className="card__purpose"><i className="icon-ihminen"></i> Henkilö</h3>
        <div className="card__content">
          <h4 className="card__title">Muokkaa henkilöä</h4>
          <PersonForm
            onSubmit={this.onFormSubmit}
            onCancel={this.toggleEditMode}
            initialValues={model}
            formKey={'personForm-' + model.id} />
        </div>
      </div>;
    }
    else {
      return <div className="person__wrapper card__wrapper">
        <h3 className="card__purpose"><i className="icon-ihminen"></i> Henkilö</h3>

        <div className="card__content">
          <p className="person__infos">
            <span className="person__display-name">{model.displayName}</span>
            <span className="person__full-name">{model.fullName}</span>
          </p>
          <div className="card__controls">
            <button onClick={this.toggleEditMode} className="person__edit">
              <i className="icon-muokkaa"></i> Muokkaa
            </button>
          </div>
        </div>
      </div>;
    }
  }
});
