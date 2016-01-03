import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Link} from 'react-router';
import classNames from 'classnames';



export default React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    return <div className="header__wrapper pure-menu pure-menu-horizontal">
      <h1 className="header__title">Kajaaniskate.net</h1>
      <ul className="header__links">
        <li><Link to={`/`} className="header__link"><i className="icon-koti"></i></Link></li>
        <li><Link to={`/`} className="header__link">Muokkaa</Link></li>
        <li><Link to={`/upload`} className="header__link">Uploadaa</Link></li>
        <li><Link to={`/login`} className="header__link">Login</Link></li>
      </ul>
    </div>;
  }
});
