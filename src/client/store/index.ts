import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { createReducer } from "../reducers";
import { migrate } from "./migrations";

export const history = createBrowserHistory();
const rootReducer = createReducer(history);

const persistConfig: PersistConfig<RootState> = {
  key: "root",
  version: 1,
  storage,
  migrate,
  blacklist: ["api", "router"],
  writeFailHandler: () => {
    window.dispatchEvent(new Event("quotaexceeded"));
  }
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [thunk, routerMiddleware(history)];
const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

export const store = createStore(persistedReducer, enhancer);
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type Dispatch = typeof store.dispatch;
