import React from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';

import {LoginButtonContainer as LoginButtons} from './LoginButtons';


export const LoginView = React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    return <div className="login-view__wrapper">
      <h2 className="view__title"><i className="icon-enter"></i> Kirjaudu / Rekisteröidy</h2>

      <div className="card__wrapper">
        <div className="card__content">
          <p>Kajaaniskatea käytetään Google- tai Facebook-tunnuksilla. Emme näe profiilistasi muuta kuin julkiset tiedot sekä sähköpostiosoitteen.</p>
          <LoginButtons />
        </div>
      </div>

    </div>;
  }
});

function mapStateToProps(state) {
  return {
    user: state.app.get('user')
  };
}

export const LoginViewContainer = connect(
  mapStateToProps
)(LoginView);
