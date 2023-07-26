import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import plants from './plants'
import { PlantType, UserType } from  '../types'

export interface RootState {
  plants: PlantType;
  session: UserType
  // Add other state slices if applicable
}

const rootReducer = combineReducers({
  session,
  plants,
});


let enhancer: any;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState: any) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
