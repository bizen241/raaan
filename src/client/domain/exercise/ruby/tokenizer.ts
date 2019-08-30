import * as kuromoji from "kuromoji";
import { IpadicFeatures, Tokenizer } from "kuromoji";

export const getTokenizer = () =>
  new Promise<Tokenizer<IpadicFeatures>>((resolve, reject) => {
    if (cachedTokenizer !== undefined) {
      return resolve(cachedTokenizer);
    }

    kuromoji.builder({ dicPath: "/dict" }).build((err, tokenizer) => {
      if (err) {
        reject(err);
      }

      cachedTokenizer = tokenizer;

      resolve(tokenizer);
    });
  });

let cachedTokenizer: Tokenizer<IpadicFeatures>;
