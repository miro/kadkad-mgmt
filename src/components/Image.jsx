import React from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';


export default React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    let model = this.props.image.toJS();

    return <div>
        <p>ID: {model.id}</p>
    </div>;
  }
});
