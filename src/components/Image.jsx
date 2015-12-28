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

  getInitialState() {
    return { editMode: false }
  },


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

  handlePersonSelectChange(selectedItems) {
    let linkedPersons = selectedItems.map(item => item.value).join(",");
    this.update({ linkedPersons: linkedPersons });
  },

  handleSpotSelectChange(selectedItem) {
    this.update({ spot: selectedItem.value });
  },

  update(newProps) {
    this.props.updateModel(this.props.image.get('id'), 'images', newProps);
  },


  render: function() {
    let model = this.props.image.toJS();
    let imgUrl = 'https://storage.googleapis.com/dakdak-dev/' + model.storageId; // TODO get this from.. somewhere

    if (this.state.editMode) {

      let formValues = { title: model.title, description: model.description };
      let personSelectValues = this.props.persons.map(person => {
        return {
          value: person.get('id').toString(),
          label: (person.get('displayName')) ? person.get('displayName') : person.get('id')
        };
      });
      let spotSelectValues = this.props.spots.map(spot => {
        return { value: spot.get('id') + "", label: spot.get('title') };
      });

      return <div>
        <Select
            name="image-persons"
            options={personSelectValues}
            multi={true}
            onChange={this.handlePersonSelectChange}
            value={model.linkedPersons}/>
        <Select
            name="image-spots"
            options={spotSelectValues}
            onChange={this.handleSpotSelectChange}
            value={model.spot}/>
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
