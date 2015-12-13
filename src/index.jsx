import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Route} from 'react-router';

import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';

import Immutable from 'immutable';

import modelReducer from './reducers/modelReducer';

import {EditViewContainer} from './containers/EditView';
import {UploadViewContainer} from './containers/UploadView';



const reducers = {
  models: modelReducer,
  form: formReducer
}
const reducer = combineReducers(reducers);

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

const store = createStoreWithMiddleware(reducer, {
  models: Immutable.fromJS({ persons: [], images: [], spots: [] }),
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
  <Route path="/upload" component={UploadViewContainer} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
