import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Route} from 'react-router';

import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import Immutable from 'immutable';
import Promise from 'bluebird';

import history from './history';
import {getModels} from './services/api';

import {routeReducer, syncReduxAndRouter} from 'redux-simple-router';
import {default as appReducer, defaultState as appReducerDefaultState} from './reducers/appReducer';
import modelReducer from './reducers/modelReducer';
import {reducer as formReducer} from 'redux-form';

import Header from './containers/Header'
import {EditViewContainer} from './containers/EditView';
import {UploadViewContainer} from './containers/UploadView';
import {LoginViewContainer} from './containers/LoginView';
import {LandingViewContainer} from './containers/LandingView';
import {ImageEditViewContainer} from './containers/ImageEditView';


const reducers = {
  routing: routeReducer,
  app: appReducer,
  models: modelReducer,
  form: formReducer
}
const reducer = combineReducers(reducers);

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

const store = createStoreWithMiddleware(reducer, {
  app: Immutable.fromJS(appReducerDefaultState),
  models: Immutable.fromJS({ persons: [], images: [], spots: [], uploads: [] }),
  form: {} // for react-form
});

syncReduxAndRouter(history, store);


const App = React.createClass({
  render: function() {
    return <div className="app-container">
      <Header />
      {this.props.children}
    </div>
  }
});
const routes = <Route component={App}>
  <Route path="/" component={LandingViewContainer} />
  <Route path="/login" component={LoginViewContainer} />
  <Route path="/upload" component={UploadViewContainer} />
  <Route path="/metadata" component={EditViewContainer} />
  <Route path="/images" component={ImageEditViewContainer} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
