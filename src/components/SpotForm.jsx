import React from 'react';
import {reduxForm} from 'redux-form';


const SpotFormComponent = React.createClass({
  render() {
    const {fields: {name, description}, handleSubmit, onCancel} = this.props;

    return <form onSubmit={handleSubmit} className="form--basic">
      <fieldset>
        <div className="form__group">
          <label>Otsikko</label>
          <input type="text" placeholder="Otsikko" {...name}/>
        </div>
        <div className="form__group">
          <label>Kuvaus</label>
          <textarea {...description}></textarea>
        </div>
        <div className="form__controls">
          <button type="submit">Tallenna</button>
          <button onClick={onCancel}>Peruuta</button>
        </div>
      </fieldset>
    </form>;
  }
});
export default reduxForm({
  form: 'spotForm',
  fields: ['name', 'description']
})(SpotFormComponent);
