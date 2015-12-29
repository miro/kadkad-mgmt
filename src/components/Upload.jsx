import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';


export default React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    return <div className="upload-item">
      <p>
        {this.props.fileName} ({this.props.size} kB) <span className="upload-item__status">{this.props.status}</span>
      </p>
    </div>;
  }
});
