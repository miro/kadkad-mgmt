import React from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';

import {changeTab} from '../actions/appActions';
import {toDisplayFormat} from '../models';


export const TabNavigation = React.createClass({
  mixins: [PureRenderMixin],

  onTabClick(tabName) {
    this.props.dispatch(changeTab(this.props.viewName, tabName))
  },

  render: function() {
    const tabConfig = this.props.tabState.get(this.props.viewName).toJS();

    return <div className="tabmenu__wrapper">
      {tabConfig.tabs.map((tab, i) =>
        <button
          className={classNames('tabmenu__button', { 'tabmenu__button--active': tab === tabConfig.currentTab})}
          key={i}
          onClick={() => this.onTabClick(tab)} >
          {toDisplayFormat(tab)}
        </button>
      )}
    </div>;
  }
});

function mapStateToProps(state) {
  return {
    tabState: state.app.get('tabs')
  };
}

export const TabNavigationContainer = connect(
  mapStateToProps
)(TabNavigation);
