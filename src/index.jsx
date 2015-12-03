import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Route} from 'react-router';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import Immutable from 'immutable';
import {reducer as formReducer} from 'redux-form';

import itemReducer from './reducers/itemReducer';
import {EditViewContainer} from './containers/EditView';



const reducers = {
  items: itemReducer,
  form: formReducer
}
const reducer = combineReducers(reducers);

const store = createStore(reducer, {
  items: Immutable.fromJS({ persons: [], images: []}),
  form: {}
});


const App = React.createClass({
  render: function() {
    return <div>
      {this.props.children}
    </div>
  }
});
const routes = <Route component={App}>
  <Route path="/" component={EditViewContainer} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
