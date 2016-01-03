import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Link} from 'react-router';
import classNames from 'classnames';



export default React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    return <div className="header__wrapper pure-menu pure-menu-horizontal">
      <p className="pure-menu-heading">Kajaaniskate.net</p>
      <ul className="pure-menu-list">
        <li className="pure-menu-item">
          <Link to={`/landing`} className="pure-menu-link">Koti</Link>
        </li>
        <li className="pure-menu-item">
          <Link to={`/`} className="pure-menu-link">Muokkaa</Link>
        </li>
        <li className="pure-menu-item">
          <Link to={`/upload`} className="pure-menu-link">Uploadaa</Link>
        </li>
        <li className="pure-menu-item">
          <Link to={`/login`} className="pure-menu-link">Login</Link>
        </li>
      </ul>
    </div>;
  }
});
