import * as kuromoji from "kuromoji";
import { IpadicFeatures, Tokenizer } from "kuromoji";
import { katakanaToHiragana } from "../compiler/convert";

const OKURIGANA_REGEX = /[\u3041-\u3096]*$/;

export const addRuby = async (input: string, callback: (result: string) => void) => {
  const tokenizer = await getTokenizer();
  const tokens = tokenizer.tokenize(input);

  const serialized = tokens.map(token => {
    const { surface_form: rawSurfaceForm, reading: rawReading } = token;
    if (rawReading === undefined) {
      return rawSurfaceForm;
    }

    const surfaceForm = katakanaToHiragana(rawSurfaceForm);
    const reading = katakanaToHiragana(rawReading);
    if (surfaceForm === reading) {
      return rawSurfaceForm;
    }

    const okurigana = OKURIGANA_REGEX.exec(surfaceForm);
    const okuriganaLength = okurigana != null ? okurigana[0].length : 0;

    const oyamoji = surfaceForm.slice(0, surfaceForm.length - okuriganaLength);
    const yomigana = reading.slice(0, reading.length - okuriganaLength);

    return `｜${oyamoji}（${yomigana}）${okurigana}`;
  });

  callback(serialized.join(""));
};

let cachedTokenizer: Tokenizer<IpadicFeatures>;

const getTokenizer = () =>
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
