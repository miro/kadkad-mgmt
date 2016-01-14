import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';


export default React.createClass({
  mixins: [PureRenderMixin],

  render: function() {

    const className = 'status-card--' + this.props.type;
    const iconClassName = 'icon-' + this.props.icon;

    return <div className={className}>
      <p>
        {this.props.icon ? <i className={iconClassName}></i> : ''} {this.props.message}
      </p>
    </div>;
  }
});
