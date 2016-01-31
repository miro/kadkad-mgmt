import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const CHILICORN_IMAGE_URL = 'https://raw.githubusercontent.com/futurice/spiceprogram/gh-pages/assets/img/logo/chilicorn_no_text-64.png';

export default React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    return <div className="footer__wrapper">
      <div className="footer__column">
        <h3 className="footer__title">Kajaaniskate.net</h3>
        <p>Kysymyksiä? <a href="mailto:miro@kajaaniskate.net">miro@kajaaniskate.net</a></p>
        <p>Kehitystä tukemassa <a href="http://spiceprogram.org/">Spice Program</a></p>
        <a href="http://spiceprogram.org/">
          <img id="chilicorn--logo" src={CHILICORN_IMAGE_URL} alt="Chilicorn!"/>
        </a>
      </div>

      <div className="footer__column">
        <h3 className="footer__title--placeholder">&nbsp;</h3>
        <p>&copy; 2014-2016 <a href="https://github.com/miro/kadkad-mgmt/blob/development/LICENSE">Jotkut oikeudet pidätetään</a></p>
        <p><a href="https://github.com/miro/kadkad-mgmt">Haarukoi koodit <i className="icon-github"></i> GitHubista</a></p>
      </div>
    </div>
  }
});
