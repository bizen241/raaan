declare module "workbox-webpack-plugin" {
  import { Plugin } from "webpack";

  export class GenerateSW extends Plugin {
    constructor(options: GenerateSW.Options);
  }

  namespace GenerateSW {
    interface Options {
      swDest?: string;
      clientsClaim?: boolean;
      skipWaiting?: boolean;
      exclude?: Array<string | RegExp>;
      navigateFallback?: string;
      navigateFallbackBlacklist?: RegExp[];
    }
  }
}
