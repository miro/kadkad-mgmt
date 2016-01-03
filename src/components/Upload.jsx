import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';


export default React.createClass({
  mixins: [PureRenderMixin],

  getStatusContent(status) {
    switch (status) {
      case 'in-progress':
        return <span>
          <i className="icon-lataus rotate360"></i> Uploadataan...
        </span>;
      case 'ready':
        return <span>
          <i className="icon-ok"></i> Onnistui!
        </span>;
      case 'failed':
        return <span>
          <i className="icon-varoitus"></i> Jostain syystä uploadaus epäonnistui:(
        </span>;
      default: return <span>{this.props.status}</span>;
    }
  },

  render: function() {
    const statusClass = 'upload__status--' + this.props.status;

    return <div className="upload__wrapper card__wrapper card__content">
      <p>{this.props.fileName} ({this.props.size} kB)</p>
      <div className={classNames('upload__status', statusClass)}>
        {this.getStatusContent(this.props.status)}
      </div>
    </div>;
  }
});
