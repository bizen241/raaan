import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { rootReducer } from "../reducers";

const isDevelopment = process.env.NODE_ENV === "development" || location.hostname === "localhost";
const storeEnhancer = isDevelopment ? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk);

export const configureStore = () => createStore(rootReducer, storeEnhancer);
