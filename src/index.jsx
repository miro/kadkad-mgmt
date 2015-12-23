import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Route} from 'react-router';

import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';

import Immutable from 'immutable';
import Promise from 'bluebird';

import modelReducer from './reducers/modelReducer';
import {getModels} from './apiService';

import Header from './containers/Header'
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
  models: Immutable.fromJS({ persons: [], images: [], spots: [], uploads: [] }),
  form: {} // for react-form
});


// # -> Fetch initial state
Promise.props({
  images:     getModels('images'),
  persons:    getModels('persons'),
  spots:      getModels('spots')
})
.then(data => {
  store.dispatch({
    type: 'SET_STATE',
    state: {...data}
  });
});


const App = React.createClass({
  render: function() {
    return <div>
      <Header />
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
