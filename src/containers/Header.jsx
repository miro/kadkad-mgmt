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
        <li><Link to={`/`} className="header__link">
          <i className="icon-koti"> Etusivu</i>
        </Link></li>
        <li><Link to={`/metadata`} className="header__link">
          <i className="icon-tietokanta"> Paikat &amp; Ihmiset</i>
        </Link></li>
        <li><Link to={`/upload`} className="header__link">
          <i className="icon-lataus2"> Uploadaa</i>
        </Link></li>
        <li><Link to={`/images`} className="header__link">
          <i className="icon-kuvat"> Kuvat</i>
        </Link></li>
        <li><Link to={`/login`} className="header__link">
          Login
        </Link></li>
      </ul>
    </div>;
  }
});
