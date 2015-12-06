import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';

import {reduxForm} from 'redux-form';
import {GoogleMapLoader, GoogleMap, SearchBox, Marker} from "react-google-maps";
import Select from 'react-select';


const searchBoxStyle = {
  border: "1px solid transparent",
  borderRadius: "1px",
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
  boxSizing: "border-box",
  MozBoxSizing: "border-box",
  fontSize: "14px",
  height: "32px",
  marginTop: "27px",
  outline: "none",
  padding: "0 12px",
  textOverflow: "ellipses",
  width: "400px"
};


let SpotFormComponent = React.createClass({
  render() {
    const {fields: {title, description}, handleSubmit, onCancel} = this.props;

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
      <button onClick={onCancel}>Peruuta</button>
    </form>;
  }
});
let SpotForm = reduxForm({
  fields: ['title', 'description']
})(SpotFormComponent);


export default React.createClass({
  mixins: [PureRenderMixin],

  getInitialState() {
    let markers = [];
    if (this.props.spot.get('latitude')) {
      // there was a latitude on this spot model -> there must also be a longitude
      // init a marker for it
      markers.push({
        lat: this.props.spot.get('latitude'),
        lng: this.props.spot.get('longitude'),
        title: this.props.spot.get('title')
      });
    }


    return {
      bounds: null,
      center: { lat: 64.2270644, lng: 27.7198246 }, // coords of KNI city centre
      markers: markers
    };
  },

  update(newProps) {
    this.props.updateModel(this.props.spot.get('id'), 'spots', newProps);
  },

  toggleEditMode() {
    this.updateSpotModel({ meta: { editMode: !this.props.spot.getIn(['meta', 'editMode']) }});
  },

  handleFormSubmit(formValues) {
    let newProps = Object.assign({}, formValues, { meta: { editMode: false }});

    if (this.state.markers[0]) {
      newProps.latitude = this.state.markers[0].position.lat();
      newProps.longitude = this.state.markers[0].position.lng();
    }

    this.updateSpotModel(newProps);
  },

  updateSpotModel(newProps) {
    this.props.updateModel(this.props.spot.get('id'), 'spots', newProps);
  },


  handleBoundsChanged() {
    this.setState({
      bounds: this.refs.map.getBounds(),
      center: this.refs.map.getCenter()
    });
  },

  handlePlacesChanged() {
    const places = this.refs.searchBox.getPlaces();
    const markers = [];

    // Add a marker for each place returned from search bar
    places.forEach(function (place) {
      markers.push({
        position: place.geometry.location
      });
    });

    // Set markers; set map center to first search result
    const mapCenter = markers.length > 0 ? markers[0].position : this.state.center;

    this.setState({
      center: mapCenter,
      markers: markers
    });
  },


  render: function() {
    let model = this.props.spot.toJS();

    if (this.props.spot.getIn(['meta', 'editMode'])) {
      let formValues = { title: model.title, description: model.description };

      return <div>
        <section style={{height: "400px"}}>
          <GoogleMapLoader
            containerElement={
              <div
                {...this.props}
                style={{ height: "100%" }}
              />
            }
            googleMapElement={
              <GoogleMap
                ref="map"
                defaultZoom={12}
                center={this.state.center}
                // onClick={this.handleMapClick}> // TODO!
                >

                <SearchBox
                  bounds={this.state.bounds}
                  controlPosition={google.maps.ControlPosition.TOP_LEFT}
                  onPlacesChanged={this.handlePlacesChanged}
                  ref="searchBox"
                  style={searchBoxStyle} />

                  {this.state.markers.map((marker, index) => (
                    <Marker position={marker.position} key={index} />
                  ))}

              </GoogleMap>
            }
          />
        </section>

        <SpotForm
          onSubmit={this.handleFormSubmit}
          onCancel={this.toggleEditMode}
          initialValues={formValues}
          form={'spotForm-' + model.id}/>
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
