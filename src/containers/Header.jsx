import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Link} from 'react-router';
import classNames from 'classnames';



export default React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    return <div className="header__wrapper">
      <ul>
        <li><Link to={`/landing`}>Koti</Link></li>
        <li><Link to={`/`}>Muokkaa</Link></li>
        <li><Link to={`/upload`}>Uploadaa</Link></li>
        <li><Link to={`/login`}>Login</Link></li>
      </ul>
    </div>;
  }
});
