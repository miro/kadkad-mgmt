import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Image from './Image';


export const ImageList = React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    return <div className="images__list">
      {this.props.images.map(image => {
        return <Image
          updateModel={this.props.updateModel}
          image={image}
          persons={this.props.persons}
          spots={this.props.spots}
          key={image.get('id')}
        />;
      })}
    </div>;
  }
});
