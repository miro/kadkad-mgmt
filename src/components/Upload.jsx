import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';

import {UPLOAD_STATUS} from '../actions/modelActions';


export default React.createClass({
  mixins: [PureRenderMixin],

  getStatusContent(status) {
    switch (status) {
      case UPLOAD_STATUS.IN_PROGRESS:
        return <span>
          <i className="icon-lataus rotate360"></i> Uploadataan... {this.props.uploadPercent}
        </span>;
      case UPLOAD_STATUS.READY:
        return <span>
          <i className="icon-ok"></i> Onnistui!
        </span>;
      case UPLOAD_STATUS.FAILED:
        return <span>
          <i className="icon-varoitus"></i> Jostain syystä uploadaus epäonnistui:(
        </span>;
      default: return <span>{this.props.status}</span>;
    }
  },

  render: function() {
    const statusClass = 'upload__status--' + this.props.status;

    return <div className="upload__wrapper card__wrapper">
      <h3 className="card__purpose"><i className="icon-upload"></i> Upload</h3>
      <div className="card__content">
        <p className="upload__title">
          {this.props.fileName} ({this.props.size} kB)
        </p>
        <div className={classNames('upload__status', statusClass)}>
          {this.getStatusContent(this.props.status)}
        </div>
      </div>
    </div>;
  }
});
