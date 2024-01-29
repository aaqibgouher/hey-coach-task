import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import parkingReducer from "../reducers/parkingReducer";
import helperReducer from "../reducers/helperReducer";

const rootReducer = combineReducers({
  parkingReducer,
  helperReducer,
});

// apply enhancers
const customEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create store
const store = createStore(rootReducer, customEnhancer(applyMiddleware(thunk)));

export default store;
