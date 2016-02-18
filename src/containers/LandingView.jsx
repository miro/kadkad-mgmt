import React from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import * as app from '../actions/appActions';

import {InvitationCardContainer} from './Invitation';
import {LoginButtonContainer} from './LoginButtons';
import {SpotClusterMapContainer as SpotCluster} from './SpotClusterMap';

import ImageReel from '../components/ImageReel';
import Odometer from '../components/Odometer';

const SHOW_SPOTMAP_FLAG = 'SHOW_SPOTMAP_FLAG';

export const LandingView = React.createClass({
  mixins: [PureRenderMixin],

  componentWillMount() {
    this.props.dispatch(app.fetchLatestImages());
  },

  onShowMapClick() {
    this.props.dispatch(app.setFlag(SHOW_SPOTMAP_FLAG, true));
  },

  render() {
    const {kpi} = this.props;

    return <div className="landing-view__wrapper">

      <ImageReel images={this.props.latestImages} />

      <InvitationCardContainer />

      {this.props.showSpotMap ?
        <SpotCluster />
        :
        <div className="spot-map__placeholder" onClick={this.onShowMapClick}>
          <p>
            <i className="icon-kartta"></i>
            <i className="icon-sijainti"></i>
          </p>
          <h3>Näytä Spotit kartalla</h3>
        </div>
      }

      <div className="card__wrapper">
        <h3 className="card__purpose"><i className="icon-kommentti"></i> Täh?</h3>
        <div className="card__content">

          <h2 className="card__title">Olé!</h2>
          <p>Kajaaniskate.net on yritys koota kainuulainen rullalautailukuvasto (sekä liittyvä lumella tapahtunut toiminta) yksiin kansiin. On sitten jotain mitä fiilistellä kiikkustuolissa!</p>
          <p>Askelmerkit ovat seuraavat:</p>

          <section className="phases__wrapper">
            <div className="phase-item--active">
              <h3 className="phase__title">Kuvien kerääminen</h3>
              <p>Kuvien uploadaus tämän sivun kautta, sekä tiedot niiden sijainnista, kuvaajasta, tempusta, kaikki mahdollinen! Saadaan kaikki spotit kartalle!</p>
            </div>
            <div className="phase-item">
              <h3 className="phase__title">Parhaiden kuvien etsiminen</h3>
              <p>Kun kuvia on hyvä läjä, muodostetaan niille keskinäinen paremmuusjärjestys käyttäen älypuhelinteknologiaa, mobiilisovelluksia ja älyttömiä algoritmeja!</p>
            </div>
            <div className="phase-item">
              <h3 className="phase__title">Kuvagallerian (+ kirjan?) julkaisu</h3>
              <p>Kun kaikki tämä on tehty, isketään kaikki näkyville, ja jos menee ihan putkeen, pyöräytetään jonkinnäköinen fyysinen teos pihalle. Mutta siitä lisää myöhemmin!</p>
            </div>
          </section>

          <p><strong>Miksi kaikki tämä? Aikooko näillä kuvilla joku tehdä rahaa?</strong></p>
          <p>Sivusto on tehty lähinnä koodaustaitojen kehittämisen vuoksi, sillä toiveella että tälle lopputuotteelle saattaisi löytyä yleisöä edes jonkin verran. (Tästä johtuu myös se, että sivusto on kasattu sellaisilla teknologioilla, mitkä eivät ole ihan 100% vielä lavassa, joten kaikennäköisiä pikkuvikoja ilmenee käytettäessä varmasti.)</p>
          <p>Rahaa tällä ei pyritä tekemään; JOS käy niin epäonninen tilanne, että sivustolle joudutaan laittamaan mainoksia, johtuu tämä ainoastaan siitä että ylläpitokulut ovat kasvaneet sen verran isoksi, että niitä ei viiti kokonaan omasta lompakosta kuittailla.</p>
          <p>Päämotivaattorina tämän lisäksi on aito halu kerätä Kajaanin skeittimeininkejä "yksiin kansiin." Olen aidosti sitä mieltä että meillä oli siellä aikanaan aikamoisen kova meininki, varsinkin siihen nähden miten vähän kukaan mistään mitään oikeasti tiesi. Olisi mahtavaa jos nuo kaikki eivät häviäisi historian hämäriin!</p>
          <p>Kuvien lähettäminen tänne sivustolle pitää tekijänoikeuden edelleen kuvan alkuperäisellä oikeuksien omistajilla. Lähettämällä kuvan tänne annat meille luvan käyttää kuvia tällä sivustolla, sekä myöhemmin julkaistavassa erillisessä kuvagalleriassa sekä mahdollisesti kirjassa, jos sellainen saadaan aikaiseksi väännettyä. Mitään virallista loppukäyttäjä-lisenssiä en jaksanut alkaa naputtelemaan. <strong>Jos jollekulle on tämä kynnyskysymys niin nakkaatteko sähköpostia allaolevaan osoitteeseen ja sorvataan virallisemmat käyttöehdot kuntoon!</strong></p>
          <p>Kaikkiin mieltäaskarruttaviin kysymyksiin vastataan sähköpostin välityksellä postilootassa <a href="mailto:miro@kajaaniskate.net">miro at kajaaniskate.net</a>!</p>


          {this.props.loggedIn ? null : <div>
            <p>Ei kun tunnukset jiiriin ja kuvat tiskiin!</p>
            <LoginButtonContainer />
          </div>}

        </div>
      </div>

      <div className="kpi__wrapper">
        <h2>Tähän mennessä kerätty:</h2>
        <Odometer value={kpi.imageCount} minDigits={3} title="Kuvia" />
        <Odometer value={kpi.spotCount} minDigits={3} title="Spotteja" />
        <Odometer value={parseInt(kpi.pixelCount / 1000, 10)} minDigits={9} title="Pikseleitä" unit="k" />
      </div>

    </div>;
  }
});

function mapStateToProps(state) {
  return {
    loggedIn: state.app.getIn(['user', 'loggedIn']),
    latestImages: state.app.getIn(['appState', 'latestImages']),
    kpi: state.app.getIn(['appState', 'kpi']),
    showSpotMap: state.app.getIn(['flags', SHOW_SPOTMAP_FLAG])
  };
}

export const LandingViewContainer = connect(
  mapStateToProps
)(LandingView);
