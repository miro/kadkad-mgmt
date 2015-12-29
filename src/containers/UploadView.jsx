import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';
import Dropzone from 'react-dropzone';

import Upload from '../components/Upload';
import * as actionCreators from '../actions/action_creators';


export const UploadView = React.createClass({
  mixins: [PureRenderMixin],

  onDrop(files) {
    files.map(file => this.props.dispatch(actionCreators.uploadImage(file)));
  },

  render() {
    let { images, persons, spots, dispatch } = this.props;

    return <div>
        <h2>Kuvien uploadaus</h2>

        <Dropzone onDrop={this.onDrop}>
          <div>Raahaa kuvasi tähän, tai paina tästä valitaksesi lähetettävät kuvat</div>
        </Dropzone>

        <h4>Käynnissä olevat uploadit</h4>
        <div className="uploads__wrapper">
          {this.props.uploads.map(item => (<Upload {...item.toJS()} />))}
        </div>

    </div>;
  }
});

function mapStateToProps(state) {
  return {
    images: state.models.get('images').toArray(),
    uploads: state.models.get('uploads').toArray()
  };
}

export const UploadViewContainer = connect(
  mapStateToProps
)(UploadView);
