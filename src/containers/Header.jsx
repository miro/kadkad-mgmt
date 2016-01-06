import React from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Link} from 'react-router';

export const Header = React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    return <div className="header__wrapper pure-menu pure-menu-horizontal">
      <h1 className="header__title">Kajaaniskate.net</h1>
      <ul className="header__links">
        <li><Link to={`/`} className="header__link">
          <i className="icon-koti"></i> Etusivu
        </Link></li>
        <li><Link to={`/metadata`} className="header__link">
          <i className="icon-tietokanta"></i> Paikat &amp; Ihmiset
        </Link></li>
        <li><Link to={`/upload`} className="header__link">
          <i className="icon-upload"></i> Uploadaa
        </Link></li>
        <li><Link to={`/images`} className="header__link">
          <i className="icon-kuvat"></i> Kuvat
        </Link></li>
        <li><Link to={`/login`} className="header__link">
          Login
        </Link></li>
      </ul>
    </div>;
  }
});

export const HeaderContainer = connect()(Header);
