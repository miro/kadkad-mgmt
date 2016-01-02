import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';


export default React.createClass({
  mixins: [PureRenderMixin],

  getStatusContent(status) {
    switch (status) {
      case 'in-progress':
        return <i className="icon-lataus rotate360"></i>
      case 'ready':
        return <i className="icon-ok"></i>
      case 'failed':
        return <span>Epäonnistui <i className="icon-varoitus"></i></span>;
      default: return <p>{this.props.status}</p>;
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
