import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';


export default React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    return (
      <button
        className="toggle-button"
        onClick={this.props.handleClick}
      >
        {this.props.caption}
        <span className={classNames('toggle-button__state', {'toggle-button__state--active': this.props.isActive})}>
        </span>
      </button>
    );
  }
});
