import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Slider from 'react-slick';

import ImageHilight from './ImageHilight';


export default React.createClass({
  mixins: [PureRenderMixin],

  sliderSettings: {
    dots: true,
    draggable: false,
    infinite: true,
    speed: 500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0
  },

  render: function () {
    const images = this.props.images || [];
    // note: for some reason Slider requires that the element is wrapped with <div>
    const imageComponents = images.map(image => <div key={image.id}><ImageHilight model={image} /></div>);

    if (this.props.images) {
      return <div className="image-reel__wrapper">
        <Slider {...this.sliderSettings}>
          {imageComponents}
        </Slider>
      </div>;
    }
    else {
      return <h4>Ladataan viimeisimpiä kuvia...</h4>
    }

  }
});
