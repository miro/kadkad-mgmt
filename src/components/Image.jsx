import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {reduxForm} from 'redux-form';
import Select from 'react-select';
import classNames from 'classnames';



let ImageFormComponent = React.createClass({
  render() {
    const { fields: { title, description, trickName, year, month }, handleSubmit } = this.props;
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

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
          <label>Kuukausi / Vuosi</label>
          <input type="number" placeholder={currentMonth} {...month} min="1" max="12" />
          <input type="number" placeholder={currentYear} {...year} min="1980" max={currentYear} />
        </div>

        <div className="form__controls">
          <button type="submit">Tallenna</button>
          <button onClick={this.toggleEditMode}>Peruuta</button>
          <a className="btn btn-secondary" href={this.props.imgUrl} target="_blank">Avaa alkuperäinen</a>
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

  solveLinkedProperties() {
    const {spots, persons, image} = this.props;

    const riderModel = persons.find(person => person.get('id') === image.get('riderId'));
    const spotModel = spots.find(spot => spot.get('id') === image.get('spotId'));

    return {
      riderName: (riderModel) ? riderModel.get('displayName') : 'Tuntematon sankari',
      spotName: (spotModel) ? spotModel.get('title') : 'Tuntematon sijainti'
    };
  },

  // TODO get the full path from a config file
  getImageUrl: (imageModel) => 'https://storage.googleapis.com/dakdak-dev/' + imageModel.storageId,

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
    model.imgUrl = this.getImageUrl(model);
    let cardCoverStyle = { backgroundImage: 'url(' + model.imgUrl + '--display)' };


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
      cardCoverStyle.backgroundSize = 'contain';


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
            {...model}
            form={'imageForm-' + model.id} />
        </div>
      </div>;
    }
    else {
      const solvedProps = this.solveLinkedProperties();

      return <div className="image__wrapper card__wrapper">
        <div className="card__cover" style={cardCoverStyle}></div>

        <div className="card__content">
          <h3 className="image__title">{model.title}</h3>
          <p className="image__meta">
            {solvedProps.riderName} @ {solvedProps.spotName}
          </p>
          <div className="card__controls">
            <button onClick={this.toggleEditMode}>Muokkaa</button>
          </div>
        </div>
      </div>;
    }
  }
});
