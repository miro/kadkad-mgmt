import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import {getImageUrl} from '../utils/utils';


export default React.createClass({
  mixins: [PureRenderMixin],

  render: function () {
    const model = this.props.model;
    const bgImageStyle = {backgroundImage: 'url(' + getImageUrl(model) + ')'};

    return (
      <div className="image-hilight__wrapper">
        <div className="hilight__fill" style={bgImageStyle}></div>
        <div className="hilight__image" style={bgImageStyle}></div>
        <div className="hilight__meta">
          <h3 className="hilight__title">{model.trickName} @ {model.spot.name}</h3>
          <h4 className="hilight__description">{model.rider.displayName}, {model.month}/{model.year}</h4>
        </div>
      </div>
    );
  }
});
