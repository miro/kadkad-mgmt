import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Route} from 'react-router';

import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import Immutable from 'immutable';
import Promise from 'bluebird';

import history from './history';
import {setStore as setStoreToApi, getKpi} from './services/api';
import {getUserProfile} from './services/token';

import {routeReducer, syncReduxAndRouter} from 'redux-simple-router';
import {default as appReducer, defaultState as appReducerDefaultState} from './reducers/appReducer';
import modelReducer from './reducers/modelReducer';
import {reducer as formReducer} from 'redux-form';

import {HeaderContainer} from './containers/Header'
import {EditViewContainer} from './containers/EditView';
import {UploadViewContainer} from './containers/UploadView';
import {LandingViewContainer} from './containers/LandingView';
import {ImageEditViewContainer} from './containers/ImageEditView';
import {LoginViewContainer} from './containers/LoginView';
import Footer from './components/Footer';


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

// In case user is logged in, fetch infos from localStorage
appReducerDefaultState.user = getUserProfile();

const store = createStoreWithMiddleware(reducer, {
  app: Immutable.fromJS(appReducerDefaultState),
  models: Immutable.fromJS({ persons: [], images: [], spots: [], uploads: [] }),
  form: {} // for react-form
});


syncReduxAndRouter(history, store);
setStoreToApi(store);

getKpi().then(kpi => {
  console.log('fetched', kpi);

  store.dispatch({
    type: 'SET_DATA',
    key: 'kpi',
    value: kpi
  });
});

const App = React.createClass({
  render: function() {
    return <div className="site__wrapper">
      <HeaderContainer />
      <div className="app-container">
        {this.props.children}
      </div>
      <Footer />
    </div>;
  }
});
const routes = <Route component={App}>
  <Route path="/" component={LandingViewContainer} />
  <Route path="/upload" component={UploadViewContainer} />
  <Route path="/metadata" component={EditViewContainer} />
  <Route path="/images" component={ImageEditViewContainer} />
  <Route path="/kirjaudu" component={LoginViewContainer} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
