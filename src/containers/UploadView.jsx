import React from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';
import Dropzone from 'react-dropzone';

import Upload from '../components/Upload';
import {uploadImage} from '../actions/modelActions';


export const UploadView = React.createClass({
  mixins: [PureRenderMixin],

  onDrop(files) {
    files.map(file => this.props.dispatch(uploadImage(file)));
  },

  render() {
    return <div>
      <h2 className="view__title">
        <i className="icon-upload"></i> Kuvien uploadaus
      </h2>

      <Dropzone onDrop={this.onDrop} className="dropzone" activeClassName="dropzone--active">
        <div>
          <h3 className="dropzone__title"><i className="icon-camera"></i></h3>
          <p className="dropzone__desc">
            Raahaa kuvasi tähän, tai paina tästä valitaksesi lähetettävät kuvat
          </p>
          <p className="dropzone__desc--mobile">
            Paina tästä valitaksesi lähetettävät kuvat
          </p>
        </div>
      </Dropzone>

      <div className="uploads__wrapper">
        {this.props.uploads.map(item => (<Upload {...item.toJS()} key={item.toJS().id} />))}
      </div>
    </div>;
  }
});

function mapStateToProps(state) {
  return { uploads: state.models.get('uploads').toArray() };
}

export const UploadViewContainer = connect(
  mapStateToProps
)(UploadView);
