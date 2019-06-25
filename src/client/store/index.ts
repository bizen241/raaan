import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { createReducer, RootState } from "../reducers";
import { migrate } from "./migrations";

const history = createBrowserHistory();

const persistConfig: PersistConfig<RootState> = {
  key: "root",
  version: 0,
  storage,
  migrate,
  blacklist: ["dialog"],
  writeFailHandler: () => {
    window.dispatchEvent(new Event("quotaexceeded"));
  }
};
const persistedReducer = persistReducer(persistConfig, createReducer(history));

const enhancer = composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history)));

export const configureStore = () => {
  const store = createStore(persistedReducer, enhancer);
  const persistor = persistStore(store);

  return { store, history, persistor };
};
