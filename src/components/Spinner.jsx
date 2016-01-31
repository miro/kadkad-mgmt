import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';

import {UPLOAD_STATUS} from '../actions/modelActions';

export default React.createClass({
  mixins: [PureRenderMixin],

  typeToClass() {
    switch (this.props.type) {
      case UPLOAD_STATUS.PROCESSING:
        return 'spinner-bounce-middle';
      default:
        return 'spinner-blink';
    }
  },

  render: function() {
    return <div className={classNames('spinner', this.typeToClass())}></div>;
  }
});
