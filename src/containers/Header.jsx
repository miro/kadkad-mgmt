import React from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Link} from 'react-router';

export const Header = React.createClass({
  mixins: [PureRenderMixin],

  linkItems: [
    { title: 'Etusivu', icon: 'koti', href: '/' },
    { title: 'Paikat & Ihmiset', icon: 'tietokanta', href: '/metadata'},
    { title: 'Uploadaa', icon: 'upload', href: '/upload' },
    { title: 'Kuvat', icon: 'kuvat', href: '/images' },
    { title: 'Login', icon: '', href: '/login'}
  ],

  render: function() {
    const links = this.linkItems.map(link => <li key={link.href}>
      <Link to={link.href} className="header__link">
        <i className={'icon-'+link.icon}></i> {link.title}
      </Link>
    </li>);

    return <div className="header__wrapper pure-menu pure-menu-horizontal">
      <h1 className="header__title">Kajaaniskate.net</h1>
      <ul className="header__links">
        {links}
      </ul>
    </div>;
  }
});

export const HeaderContainer = connect()(Header);
