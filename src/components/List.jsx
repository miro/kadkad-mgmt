import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';

import Person from './Person';
import PersonForm from '../components/PersonForm';
import Spot from './Spot';
import SpotForm from '../components/SpotForm';

import * as modelActions from '../actions/modelActions';


export default React.createClass({
  mixins: [PureRenderMixin],

  getInitialState: () => ({ createMode: false}),

  toggleCreateMode(e) {
    e ? e.preventDefault() : '';
    this.setState({ createMode: !this.state.createMode });
  },

  onCreateFormSubmit(props) {
    this.props.dispatch(modelActions.createModel(this.props.itemType, props));
    this.toggleCreateMode();
  },

  getComponents() {
    switch (this.props.itemType) {
      case 'spots':
        return { ItemComponent: Spot, FormComponent: SpotForm }
      case 'persons':
        return { ItemComponent: Person, FormComponent: PersonForm }
      default:
        console.error('Unknown itemType', this.props.itemType, 'in List-component!');
        return null;
    }
  },

  render: function() {
    const {ItemComponent, FormComponent} = this.getComponents();

    return <div className="list__wrapper">
      {!this.state.createMode ?
        <button onClick={this.toggleCreateMode} className="btn-primary list__btn-create">
          <i className="icon-plus"></i> Luo Uusi
        </button>
        :
        <FormComponent
          onSubmit={(props) => this.onCreateFormSubmit(props)}
          onCancel={this.toggleCreateMode}
          initialValues={{}}
          formKey={'ListComponent-create-' + this.props.itemType} />
      }

      {this.props.items.map(item => {
        return <ItemComponent
          updateModel={this.props.updateModel}
          model={item}
          key={item.get('id')} />;
      })}
    </div>;
  }
});
