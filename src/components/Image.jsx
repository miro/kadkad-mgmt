import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {reduxForm} from 'redux-form';
import Select from 'react-select';
import classNames from 'classnames';




let ImageFormComponent = React.createClass({
  render() {
    const {fields: {title, description}, handleSubmit} = this.props;

    return <form onSubmit={handleSubmit}>
      <div>
        <label>Otsikko</label>
        <input type="text" placeholder="Otsikko" {...title}/>
      </div>
      <div>
        <label>Kuvaus</label>
        <textarea {...description}></textarea>
      </div>
      <button type="submit" onClick={this.handleSubmit}>Tallenna</button>
    </form>;
  }
});
let ImageForm = reduxForm({
  fields: ['title', 'description']
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
    let newProps = Object.assign({}, formValues)
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

      let formValues = { title: model.title, description: model.description };
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
        <Select
            name="image-rider"
            options={personSelectValues}
            onChange={this.handleAttributeChange('riderId')}
            value={model.riderId}/>
        <Select
            name="image-spot"
            options={spotSelectValues}
            onChange={this.handleAttributeChange('spotId')}
            value={model.spotId}/>
        <ImageForm
          onSubmit={this.handleFormSubmit}
          initialValues={formValues}
          form={'imageForm-' + model.id}/>
      </div>;
    }
    else {
      return <div>
        <p>#{model.id} / {model.title}</p>
        <img src={imgUrl} className="image__preview--list"/>
        <button onClick={this.toggleEditMode}>edit</button>
      </div>;
    }
  }
});
