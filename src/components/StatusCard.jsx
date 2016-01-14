import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';


export default React.createClass({
  mixins: [PureRenderMixin],

  render: function() {

    const iconClassName = 'icon-' + this.props.icon;

    return <div className={'status-card--' + this.props.type}>
      {this.props.icon ?  <i className={iconClassName}></i> : ''}
      {this.props.title ? <h3>{this.props.title}</h3> : ''}
      <p>{this.props.message}</p>
    </div>;
  }
});
