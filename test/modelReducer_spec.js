import {List, Map, fromJS, toJS} from 'immutable';
import {expect} from 'chai';

import modelReducer from '../src/reducers/modelReducer';

function getInitialState() {
  return fromJs({ persons: [], images: []});
}

describe('modelReducer', () => {

  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: {foo: 'bar' }
    };
    const nextState = modelReducer(initialState, action);

    expect(nextState).to.equal(fromJS({ foo: 'bar' }));
  });


  it('handles SET_STATE without initial state', () => {
    const action = {
      type: 'SET_STATE',
      state: {
        images: [{ id: 3, name: 'foo'}, {id: 5, name: 'bar' }],
        foo: 'bar'
      }
    };
    const nextState = modelReducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      images: [{ id: 3, name: 'foo'}, {id: 5, name: 'bar' }],
      foo: 'bar'
    }));
  });


  it('handles MODEL_CREATE', () => {
    const initialState = Map();
    const action = {
      type: 'MODEL_CREATE',
      modelType: 'images',
      model: { id: 9, name: 'foo' }
    };

    const nextState = modelReducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      images: [{ id: 9, name: 'foo' }]
    }));
  });


  it('handles MODEL_UPDATE', () => {
    const initialState = fromJS({
      persons: [ { id: 9, name: 'foo' }]
    });
    const action = {
      type: 'MODEL_UPDATE',
      modelType: 'persons',
      model: { name: 'bar' }
    };
    const nextState = modelReducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      persons: [ { id: 9, name: 'bar' }]
    }));
  });
});