import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {List} from 'immutable';

import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';
import {default as MarkerClusterer} from 'react-google-maps/lib/addons/MarkerClusterer';

import * as app from '../actions/appActions';
import {DEFAULT_MAP_CENTER} from '../constants';

export const SpotClusterMap = React.createClass({
  mixins: [PureRenderMixin],

  componentWillMount() {
    this.props.dispatch(app.fetchSpotLocations());
  },

  render: function() {
    return <div className="spot-cluster__wrapper">
      <h3 className="card__purpose--spot">
        <i className="icon-sijainti"></i> Tallennetut Spotit
      </h3>

      <section className="spot-cluster__map__wrapper">
        <GoogleMapLoader
          containerElement={<div {...this.props} className="spot-cluster__container" />}
          googleMapElement={
            <GoogleMap
              ref="map"
              defaultZoom={14}
              center={DEFAULT_MAP_CENTER}
            >

              {this.props.locations.map((marker, index) => (
                <Marker position={marker.position} key={index} />
              ))}

              <MarkerClusterer
               averageCenter={true}
               enableRetinaIcons={true}
               gridSize={20} // this affects how soon the pins are clustered into one
              >
                {this.props.locations.map((marker, index) => (
                  <Marker
                    position={{ lat: marker.latitude, lng: marker.longitude }}
                    key={index} />
                ))}
              </MarkerClusterer>
            </GoogleMap>
          }
        />
      </section>
    </div>
  }
});

function mapStateToProps(state) {
  const locationsDefault = [];
  const locationsList = state.app.getIn(['appState', app.SPOT_LOCATIONS]);

  return {
    locations: List.isList(locationsList) ? locationsList.toJS() : locationsDefault
  };
}

export const SpotClusterMapContainer = connect(
  mapStateToProps
)(SpotClusterMap);
