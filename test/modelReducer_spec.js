import {List, Map, fromJS, toJS} from 'immutable';
import {expect} from 'chai';

import modelReducer from '../src/reducers/modelReducer';


describe('modelReducer', () => {

  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: { foo: 'bar' }
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
      persons: [
        { id: 9, name: 'foo' },
        { id: 10, name: 'bar' },
        { id: 1, name: 'zen' }
      ]
    });
    const action = {
      type: 'MODEL_UPDATE',
      modelType: 'persons',
      model: { id: 9, name: 'barfoo' }
    };
    const nextState = modelReducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      persons: [
        { id: 9, name: 'barfoo' },
        { id: 10, name: 'bar' },
        { id: 1, name: 'zen' }
      ]
    }));
  });


  it('handles MODEL_DELETE', () => {
    const initialState = fromJS({
      persons: [
        { id: 9, name: 'foo' },
        { id: 10, name: 'bar' },
        { id: 1, name: 'zen' }
      ]
    });

    const action = {
      type: 'MODEL_DELETE',
      modelType: 'persons',
      model: { id: 9 }
    };
    const nextState = modelReducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      persons: [
        { id: 10, name: 'bar' },
        { id: 1, name: 'zen' }
      ]
    }));
  });


  it('handles MODEL_DELETE with unexistent id', () => {
    const initialState = fromJS({
      persons: [
        { id: 10, name: 'bar' },
        { id: 1, name: 'zen' }
      ]
    });

    const action = {
      type: 'MODEL_DELETE',
      modelType: 'persons',
      model: { id: 15 }
    };
    const nextState = modelReducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      persons: [
        { id: 10, name: 'bar' },
        { id: 1, name: 'zen' }
      ]
    }));
  });


  it('handles MODEL_DELETE with only one model', () => {
    const initialState = fromJS({
      persons: [{ id: 10, name: 'bar' }]
    });

    const action = {
      type: 'MODEL_DELETE',
      modelType: 'persons',
      model: { id: 10 }
    };
    const nextState = modelReducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      persons: []
    }));
  });
});
