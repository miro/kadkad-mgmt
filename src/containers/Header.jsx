import React from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Link} from 'react-router';

import * as role from '../services/role';

export const Header = React.createClass({
  mixins: [PureRenderMixin],

  linkItems: [
    { title: 'Etusivu', icon: 'koti', href: '/' },
    { title: 'Paikat & Ihmiset', icon: 'tietokanta', href: '/metadata', requiresAuth: true, requiresRole: role.EDITOR },
    { title: 'Uploadaa', icon: 'upload', href: '/upload', requiresAuth: true },
    { title: 'Kuvat', icon: 'kuvat', href: '/images', requiresAuth: true }
  ],

  render: function() {
    const user = this.props.user.toJS();

    console.log(user);

    const links = this.linkItems.map(link => {
      if (!link.requiresAuth || (link.requiresAuth && user.loggedIn) &&
         (!link.requiresRole || role.isAuthorized(user.profile.role, role.EDITOR))) {

        return <li key={link.href}>
          <Link to={link.href} className="header__link">
            <i className={'icon-'+link.icon}></i> <span className="link__title">{link.title}</span>
          </Link>
        </li>;
      }
    });

    return <div className="header__wrapper pure-menu pure-menu-horizontal">
      <h1 className="header__title header__title--full">Kajaaniskate.net</h1>
      <h1 className="header__title header__title--mini">kniskate</h1>
      <ul className="header__links">
        {links}
      </ul>
    </div>;
  }
});

export const HeaderContainer = connect(state => ({
  user: state.app.get('user')
}))(Header);
