import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';


export default React.createClass({
  mixins: [PureRenderMixin],

  typeToIconClass(type) {
    switch(type) {
      case 'spot':
        return 'icon-sijainti';
      case 'person':
        return 'icon-ihminen';
      case 'photographer':
        return 'icon-camera';
      default:
        return null;
    }
  },

  // without a type property, badge renders as an "warning" badge
  render: function() {
    return <span className={classNames('badge__wrapper', 'badge__wrapper--' + this.props.type)}>
      {this.props.type ? <i className={this.typeToIconClass(this.props.type)}></i> : null}
      {this.props.children}
    </span>
  }
});
