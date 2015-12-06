import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';

import {reduxForm} from 'redux-form';
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";
import Select from 'react-select';




let SpotFormComponent = React.createClass({
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
let SpotForm = reduxForm({
  fields: ['title', 'description']
})(SpotFormComponent);


export default React.createClass({
  mixins: [PureRenderMixin],

  update(newProps) {
    this.props.updateModel(this.props.spot.get('id'), 'spots', newProps);
  },

  toggleEditMode() {
    this.update({ meta: { editMode: !this.props.spot.getIn(['meta', 'editMode']) }});
  },

  handleFormSubmit(formValues) {
    let newProps = Object.assign({}, formValues, { meta: { editMode: false }})
    this.update(newProps);
  },

  update(newProps) {
    this.props.updateModel(this.props.spot.get('id'), 'spots', newProps);
  },


  render: function() {
    let model = this.props.spot.toJS();

    if (this.props.spot.getIn(['meta', 'editMode'])) {
      let formValues = { title: model.title, description: model.description };

      return <div>
        <SpotForm
          onSubmit={this.handleFormSubmit}
          initialValues={formValues}
          form={'spotForm-' + model.id}/>

        <section style={{height: "400px"}}>

          <GoogleMapLoader
            containerElement={
              <div
                {...this.props}
                style={{
                  height: "100%",
                }}
              />
            }
            googleMapElement={
              <GoogleMap
                ref={(map) => console.log(map)}
                defaultZoom={3}
                defaultCenter={{lat: -25.363882, lng: 131.044922}}
                // onClick={::this.handleMapClick}>
                >

              </GoogleMap>
            }
          />
        </section>
      </div>;
    }
    else {
      return <div>
        <p>#{model.id} / {model.title}</p>
        <button onClick={this.toggleEditMode}>edit</button>
      </div>;
    }
  }
});
