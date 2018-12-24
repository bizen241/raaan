import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { rootReducer } from "../reducers";

const isDevelopment = process.env.NODE_ENV === "development" || location.hostname === "localhost";
const storeEnhancer = isDevelopment ? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk);

const persistConfig: PersistConfig = {
  key: "root",
  version: 0,
  storage
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureStore = () => {
  const store = createStore(persistedReducer, storeEnhancer);
  const persistor = persistStore(store);

  return { store, persistor };
};
