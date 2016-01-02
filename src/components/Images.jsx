import React from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';

import Image from './Image';


export const Images = React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    return <div>
        <h2>Kuvat</h2>

        <button
          onClick={() => this.props.createModel('images')}
          className="btn-primary"
          >Luo Kuva</button>

        <div className="images__list">
          {this.props.images.map(image => {
            return <Image
              updateModel={this.props.updateModel}
              image={image}
              persons={this.props.persons}
              spots={this.props.spots}
              key={image.get('id')}
            />;
          })}
        </div>
    </div>;
  }
});
