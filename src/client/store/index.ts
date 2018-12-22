import { createStore } from "redux";
import { rootReducer } from "../reducers";

export const configureStore = () => createStore(rootReducer);
