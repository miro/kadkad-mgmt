import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';

import Spot from './Spot';


export const Spots = React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    return <div>
        <div className="spots__list">
          {this.props.spots.map(spot => {
            return <Spot
              updateModel={this.props.updateModel}
              spot={spot}
              key={spot.get('id')}
            />
          })}
        </div>
    </div>;
  }
});
