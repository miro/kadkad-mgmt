import React from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import * as app from '../actions/appActions';
import {InvitationContainer} from './Invitation';
import Odometer from '../components/Odometer';


export const LandingView = React.createClass({
  mixins: [PureRenderMixin],

  render() {
    const {kpi} = this.props;

    return <div>

      <div className="card__wrapper">
        <h3 className="card__purpose">Täh?</h3>
        <div className="card__content">

          <h2 className="card__title">Olé!</h2>
          <p>Kajaaniskate.net on yritys koota kainuulainen rullalautailukuvasto (sekä liittyvä lumella tapahtunut toiminta) yksiin kansiin. Nostalgiafiilistelyprojekti siis, on sitten jotain mitä selailla kiikkustuolissa!</p>
          <p>Askelmerkit ovat suurinpiirtein seuraavat:</p>

          <section className="phases__wrapper">
            <div className="phase-item--active">
              <h3 className="phase__title">Kuvien kerääminen tämän sivuston kautta</h3>
              <p>Kuvien uploadaus tämän sivun kautta, sekä tiedot niiden sijainnista, kuvaajasta, tempusta, kaikki mahdollinen! Saadaan kaikki spotit kartalle!</p>
            </div>
            <div className="phase-item">
              <h3 className="phase__title">Parhaiden kuvien etsiminen mobiilisovelluksen avulla</h3>
              <p>Kun kuvia on hyvä läjä, muodostetaan niille keskinäinen paremmuusjärjestys käyttäen älypuhelinteknologiaa ja älyttömiä algoritmeja!</p>
            </div>
            <div className="phase-item">
              <h3 className="phase__title">Kuvagallerian (+ kirjan?) julkaisu</h3>
              <p>Kun kaikki tämä on tehty, isketään kaikki näkyville, ja jos menee ihan putkeen, pyöräytetään jonkinnäköinen fyysinen teos pihalle. Mutta siitä lisää myöhemmin!</p>
            </div>
          </section>
        </div>
      </div>

      <div className="kpi__wrapper">
        <Odometer value={kpi.imageCount} minDigits={3} title="Kuvia" />
        <Odometer value="3" minDigits={3} title="Spotteja" />
        <Odometer value={kpi.pixelCount} minDigits={12} title="Pikseleitä" />
      </div>

      <InvitationContainer />

    </div>;
  }
});

function mapStateToProps(state) {
  return {
    kpi: state.app.getIn(['appState', 'kpi'])
  };
}

export const LandingViewContainer = connect(
  mapStateToProps
)(LandingView);
