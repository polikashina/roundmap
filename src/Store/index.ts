import { createStore, combineReducers, applyMiddleware } from "redux";
import { modeReducer, areaReducer } from "./Reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";

// TODO types like state
const rootReducer = combineReducers({
  mode: modeReducer,
  area: areaReducer,
});

const logging = (store: any) => (next: any) => (action: any) => {
  console.info("dispathing an action", action);
  let result = next(action);
  console.log("new state", store.getState());
  return result;
};

const catchError = () => (next: any) => (action: any) => {
  try {
    return next(action);
  } catch (err) {
    console.error("Caught an exception!", err);
    throw err;
  }
};

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logging, catchError)));

export default store;
