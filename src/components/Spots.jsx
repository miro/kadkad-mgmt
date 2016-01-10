import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';

import Spot from './Spot';
import SpotForm from '../components/SpotForm';

import * as modelActions from '../actions/modelActions';


export const Spots = React.createClass({
  mixins: [PureRenderMixin],

  getInitialState: () => ({ createMode: false}),

  toggleCreateMode(e) {
    e ? e.preventDefault() : '';
    this.setState({ createMode: !this.state.createMode });
  },

  onCreateFormSubmit(props) {
    this.props.dispatch(modelActions.createModel('spots', props));
    this.toggleCreateMode();
  },

  render: function() {
    return <div>
      <button onClick={this.toggleCreateMode} className="btn-primary">Luo Spotti</button>
      {this.state.createMode ?
        <SpotForm
          onSubmit={(props) => this.onCreateFormSubmit(props)}
          onCancel={this.toggleCreateMode}
          initialValues={{}}
          formKey={'spotForm-create'} />
       : ''}

      {this.props.spots.map(spot => {
        return <Spot
          updateModel={this.props.updateModel}
          spot={spot}
          key={spot.get('id')} />;
      })}
    </div>;
  }
});
