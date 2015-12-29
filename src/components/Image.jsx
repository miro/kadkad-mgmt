import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {reduxForm} from 'redux-form';
import Select from 'react-select';
import classNames from 'classnames';



let ImageFormComponent = React.createClass({
  render() {
    const { fields: { title, description, trickName, year, month }, handleSubmit } = this.props;

    return <form onSubmit={handleSubmit}>
      <div>
        <label>Otsikko</label>
        <input type="text" placeholder="Otsikko" {...title}/>
      </div>
      <div>
        <label>Tempun nimi</label>
        <input type="text" placeholder="Nollie Kickflip 900 50-50" {...trickName}/>
      </div>
      <div>
        <label>Kuvaus</label>
        <textarea {...description}></textarea>
      </div>
      <div>
        <input type="number" placeholder="Kuukausi (3)" {...month}/>
        <input type="number" placeholder="Vuosi (2016)" {...year}/>
      </div>
      <button type="submit" onClick={this.handleSubmit}>Tallenna</button>
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

      return <div>
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
          form={'imageForm-' + model.id}/>
      </div>;
    }
    else {
      return <div>
        <p>#{model.id} / {model.title}</p>
        <img src={imgUrl + '--thumb'} className="image__preview--list"/>
        <button onClick={this.toggleEditMode}>edit</button>
      </div>;
    }
  }
});
