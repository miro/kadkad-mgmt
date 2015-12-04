import React from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';

import * as actionCreators from '../actions/action_creators';
import Image from './Image';


export const Images = React.createClass({
  mixins: [PureRenderMixin],


  render: function() {
    let imageComponents = [];

    this.props.images.map(image => {
      imageComponents.push(
        <Image
          updateModel={this.props.updateModel}
          image={image}
          persons={this.props.persons}
          key={image.get('id')}
        />
      );
    });

    return <div>
        <h2>Images</h2>

        <button onClick={() => this.props.createModel('images')}>Luo Kuva</button>

        <div className="images__list">
          {imageComponents}
        </div>
    </div>;
  }
});
