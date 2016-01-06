import React from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Link} from 'react-router';

export const Header = React.createClass({
  mixins: [PureRenderMixin],

  linkItems: [
    { title: 'Etusivu', icon: 'koti', href: '/' },
    { title: 'Paikat & Ihmiset', icon: 'tietokanta', href: '/metadata', requiresAuth: true },
    { title: 'Uploadaa', icon: 'upload', href: '/upload', requiresAuth: true },
    { title: 'Kuvat', icon: 'kuvat', href: '/images', requiresAuth: true },
    { title: 'Login', icon: '', href: '/login'} // TODO move to home page or something
  ],

  render: function() {
    const user = this.props.user.toJS();

    const links = this.linkItems.map(link => {
      if (!link.requiresAuth || (link.requiresAuth && user.loggedIn)) {
        return <li key={link.href}>
          <Link to={link.href} className="header__link">
            <i className={'icon-'+link.icon}></i> {link.title}
          </Link>
        </li>;
      }
    });

    return <div className="header__wrapper pure-menu pure-menu-horizontal">
      <h1 className="header__title">Kajaaniskate.net</h1>
      <ul className="header__links">
        {links}
      </ul>
    </div>;
  }
});

export const HeaderContainer = connect(state => ({
  user: state.app.get('user')
}))(Header);
