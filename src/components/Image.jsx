import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {reduxForm} from 'redux-form';
import Select from 'react-select';
import classNames from 'classnames';



let ImageFormComponent = React.createClass({
  render() {
    const { fields: { title, description, trickName, year, month }, handleSubmit } = this.props;

    return <form onSubmit={handleSubmit} className="form--basic">
      <fieldset>
        <div className="form__group">
          <label>Otsikko</label>
          <input type="text" placeholder="Otsikko" {...title}/>
        </div>
        <div className="form__group">
          <label>Tempun nimi</label>
          <input type="text" placeholder="Nollie Kickflip 900 50-50" {...trickName}/>
        </div>
        <div className="form__group">
          <label>Kuvaus</label>
          <textarea {...description}></textarea>
        </div>
        <div className="form__group">
          <input type="number" placeholder="Kuukausi (3)" {...month}/>
          <input type="number" placeholder="Vuosi (2016)" {...year}/>
        </div>

        <div className="form__controls">
          <button type="submit">Tallenna</button>
          <button onClick={this.toggleEditMode}>Peruuta</button>
        </div>
      </fieldset>
    </form>;
  }
});
let ImageForm = reduxForm({
  fields: ['title', 'description', 'trickName', 'month', 'year']
})(ImageFormComponent);


export default React.createClass({
  mixins: [PureRenderMixin],

  getInitialState: () => ({ editMode: false }),

  update(newProps) {
    this.props.updateModel(this.props.image.get('id'), 'images', newProps);
  },

  toggleEditMode() {
    this.setState({ editMode: !this.state.editMode });
  },

  handleFormSubmit(formValues) {
    const newProps = Object.assign({}, formValues);
    this.update(newProps);
    this.toggleEditMode();
  },

  // general handler factory for spotId, riderId etc
  handleAttributeChange(attribute) {
    return selectedItem => {
      let newProps = {};
      newProps[attribute] = selectedItem.value;
      this.update(newProps);
    }
  },


  render: function() {
    let model = this.props.image.toJS();
    let imgUrl = 'https://storage.googleapis.com/dakdak-dev/' + model.storageId; // TODO get this from.. somewhere
    let cardCoverStyle = { backgroundImage: 'url(' + imgUrl + '--thumb)' };


    if (this.state.editMode) {

      let personSelectValues = this.props.persons.map(person => {
        return {
          value: person.get('id'),
          label: (person.get('displayName')) ? person.get('displayName') : person.get('id')
        };
      });
      let spotSelectValues = this.props.spots.map(spot => {
        return { value: spot.get('id'), label: spot.get('name') };
      });


      return <div className="image__wrapper image__wrapper--editmode card__wrapper">
        <div className="card__cover" style={cardCoverStyle}></div>

        <div className="card__content">
          <label>Atleetti</label>
          <Select
              name="image-rider"
              options={personSelectValues}
              onChange={this.handleAttributeChange('riderId')}
              value={model.riderId}/>

          <label>Spotti</label>
          <Select
              name="image-spot"
              options={spotSelectValues}
              onChange={this.handleAttributeChange('spotId')}
              value={model.spotId}/>

          <label>Kuvaaja</label>
          <Select
              name="image-photographer"
              options={personSelectValues}
              onChange={this.handleAttributeChange('photographerId')}
              value={model.photographerId}/>

          <ImageForm
            onSubmit={this.handleFormSubmit}
            initialValues={model}
            form={'imageForm-' + model.id} />
        </div>
      </div>;
    }
    else {
      return <div className="image__wrapper card__wrapper">
        <div className="card__cover" style={cardCoverStyle}></div>

        <div className="card__content">
          <p>#{model.id} / {model.title}</p>
          <div className="card__controls">
            <button onClick={this.toggleEditMode}>Muokkaa</button>
          </div>
        </div>
      </div>;
    }
  }
});
