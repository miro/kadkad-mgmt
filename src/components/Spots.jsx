import React from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';

import Spot from './Spot';


export const Spots = React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    return <div>
        <h2>Spotit</h2>

        <button onClick={() => this.props.createModel('spots')}>Luo Spotti</button>

        <div className="spots__list">
          {this.props.spots.map(spot => {
            return <Spot
              updateModel={this.props.updateModel}
              spot={spot}
              key={spot.get('id')}
            />
          })
        }
        </div>
    </div>;
  }
});
