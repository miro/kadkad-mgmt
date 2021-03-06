import React from 'react';
import {reduxForm} from 'redux-form';

const PersonFormComponent = React.createClass({
  render() {
    const {fields: {fullName, displayName}, handleSubmit, onCancel} = this.props;
    return (
      <form onSubmit={handleSubmit} className="form--basic">
        <fieldset>
          <div className="form__group">
            <label>Näytettävä nimi</label>
            <input type="text" placeholder="Näytettävä nimi" {...displayName}/>
          </div>
          <div className="form__group">
            <label>Koko nimi</label>
            <input type="text" placeholder="Koko nimi" {...fullName}/>
          </div>


          <div className="form__controls">
            <button type="submit">Tallenna</button>
            <button onClick={onCancel}>Peruuta</button>
          </div>
        </fieldset>
      </form>
    );
  }
});
export default reduxForm({
  form: 'personForm',
  fields: ['fullName', 'displayName']
})(PersonFormComponent);
