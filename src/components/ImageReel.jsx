import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {List} from 'immutable';

import Slider from 'react-slick';
import ImageHilight from './ImageHilight';
import Spinner from './Spinner';

export default React.createClass({
  mixins: [PureRenderMixin],

  sliderSettings: {
    autoplay: true,
    autoplaySpeed: 3500,

    dots: true,
    draggable: false,
    swipe: false,
    infinite: true,
    speed: 500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0
  },

  render: function () {

    if (List.isList(this.props.images)) {
      // note: for some reason Slider requires that the element is wrapped with <div>
      const imageComponents = this.props.images
        .toJS()
        .map(image => <div key={image.id}><ImageHilight key={image.id} model={image} /></div>);

      return <div className="image-reel__wrapper">
        <h3 className="card__purpose--image">
          <i className="icon-kuvat"></i> 10 viimeksi muokattua/l&auml;hetetty&auml; kuvaa
        </h3>

        <Slider {...this.sliderSettings}>
          {imageComponents}
        </Slider>
      </div>;
    }
    else {
      return <div className="image-reel__wrapper--loading">
        <h4>Ladataan viimeisimpiä kuvia...</h4>
        <Spinner className="spinner" />
      </div>
    }

  }
});
