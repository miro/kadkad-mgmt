import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import {GoogleMapLoader, GoogleMap, SearchBox, Marker} from "react-google-maps";
import Select from 'react-select';

import SpotForm from './SpotForm';


// Styles for the search input field on the map.
// These can't be implemented via CSS, since these props will get copied into the element
// which the react-google-maps will generate.
const mapSearchBoxStyle = {
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


export default React.createClass({
  mixins: [PureRenderMixin],

  getInitialState() {
    let state = { editMode: false };

    // Google Map related state params
    let markers = [];
    if (this.props.spot.get('latitude')) {
      // there was a latitude on this spot model -> there must also be a longitude
      // init a marker for it
      markers.push({
        name: this.props.spot.get('name'),
        position: {
          lat: this.props.spot.get('latitude'),
          lng: this.props.spot.get('longitude')
        }
      });
    }

    state.bounds = null;
    state.markers = markers;

    // set map center based on if there are markers or not
    if (markers.length > 0) {
      state.center = markers[0].position;
    } else {
      // spot has no markers yet - set map center to Kajaani city
      state.center = { lat: 64.2270644, lng: 27.7198246 };
    }

    return state;
  },

  update(newProps) {
    this.props.updateModel(this.props.spot.get('id'), 'spots', newProps);
  },

  toggleEditMode(e) {
    // if this triggered through react-form, there is an event object as parameter.
    // in that case preventDefault from it!
    e ? e.preventDefault() : '';
    this.setState({ editMode: !this.state.editMode });
  },

  handleFormSubmit(formValues) {
    let newProps = Object.assign({}, formValues);

    if (this.state.markers[0]) {
      newProps.latitude = this.state.markers[0].position.lat;
      newProps.longitude = this.state.markers[0].position.lng;
    }

    this.updateSpotModel(newProps);
    this.toggleEditMode();
  },

  updateSpotModel(newProps) {
    this.props.updateModel(this.props.spot.get('id'), 'spots', newProps);
  },

  handleBoundsChanged(e) {
    this.setState({
      bounds: this.refs.map.getBounds(),
      center: this.refs.map.getCenter()
    });
  },

  handleMapClick(e) {
    this.setMarkerPosition(e.latLng.lat(), e.latLng.lng());
  },

  handlePlacesChanged() {
    const places = this.refs.searchBox.getPlaces();
    const markers = [];

    // Add a marker for first Place returned by the Search Bar
    if (places.length > 0) {
      this.setMarkerPosition(places[0].geometry.location.lat(), places[0].geometry.location.lng(), true);
    }
  },

  setMarkerPosition(lat, lng, centerMapToMarker) {
    let stateDelta = {};
    stateDelta.markers = [{
      position: { lat, lng }
    }];

    if (centerMapToMarker) {
      stateDelta.center = stateDelta.markers[0].position;
    }

    this.setState(stateDelta);
  },


  render: function() {
    let model = this.props.spot.toJS();

    if (this.state.editMode) {
      let formValues = { name: model.name, description: model.description };

      return <div className="card__wrapper spot__wrapper">
        <section className="card__cover spot__map__wrapper">
          <GoogleMapLoader
            containerElement={<div {...this.props} className="spot-map__container" />}
            googleMapElement={
              <GoogleMap
                ref="map"
                defaultZoom={14}
                onClick={this.handleMapClick}
                onCenterChanged={this.handleBoundsChanged}
                center={this.state.center} >

                <SearchBox
                  bounds={this.state.bounds}
                  controlPosition={google.maps.ControlPosition.TOP_LEFT}
                  onPlacesChanged={this.handlePlacesChanged}
                  ref="searchBox"
                  placeholder="Hakusana"
                  style={mapSearchBoxStyle} />

                {this.state.markers.map((marker, index) => (
                  <Marker position={marker.position} key={index} />
                ))}
              </GoogleMap>
            }
          />
        </section>

        <h3 className="card__purpose"><i className="icon-sijainti"></i> Spotti</h3>
        <div className="card__content">
          <SpotForm
            onSubmit={this.handleFormSubmit}
            onCancel={this.toggleEditMode}
            initialValues={formValues}
            formKey={'spotForm-' + model.id} />
        </div>
      </div>;
    }
    else {
      return <div className="card__wrapper spot__wrapper">
        <h3 className="card__purpose"><i className="icon-sijainti"></i> Spotti</h3>
        <div className="card__content">
          <h4>
            {model.name}
            {(!model.latitude) ?
              <span className="card__badge">Sijainti puuttuu</span>
              : ''}
          </h4>
          <div className="card__controls">
            <button onClick={this.toggleEditMode}>
              <i className="icon-muokkaa"></i> Muokkaa
            </button>
          </div>
        </div>
      </div>;
    }
  }
});
