declare module "redux-persist/es/types" {
  interface PersistConfig<S, RS = any, HSS = any, ESS = any> {
    writeFailHandler?: (e: Error) => void;
  }
}
