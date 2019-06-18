import * as kuromoji from "kuromoji";
import { IpadicFeatures, Tokenizer } from "kuromoji";
import { rubyAnchorCharacter, rubySeparatorCharacter, rubyTerminatorCharacter } from "../../../shared/exercise";
import { convertKatakanaToHiragana } from "../../../shared/exercise/compiler/convert";

export const addRuby = async (inputText: string, callback: (outputText: string) => void) => {
  const tokenizer = await getTokenizer();

  const outputText = inputText
    .split(rubyAnchorCharacter)
    .map((sourceText, index) => {
      if (sourceText.length === 0) {
        return "";
      }

      const rubiedTextLength = getRubiedTextLength(sourceText);
      const hasRubiedText = index !== 0 && rubiedTextLength !== 0;

      const rubiedText = hasRubiedText ? `${rubyAnchorCharacter}${sourceText.slice(0, rubiedTextLength + 1)}` : "";
      const unrubiedText = hasRubiedText ? sourceText.slice(rubiedTextLength + 1) : sourceText;

      const tokens = tokenizer.tokenize(removeSpecialCharacters(unrubiedText));
      const newRubiedTexts = tokens.map(token => createRubiedTextFromToken(token));

      return rubiedText + newRubiedTexts.join("");
    })
    .join("");

  callback(outputText);
};

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

const removeSpecialCharacters = (inputText: string) =>
  inputText
    .replace(rubyAnchorCharacter, "")
    .replace(rubySeparatorCharacter, "")
    .replace(rubyTerminatorCharacter, "");

const getRubiedTextLength = (inputText: string) => {
  const splitedByTerminatorTexts = inputText.split(rubyTerminatorCharacter);
  if (splitedByTerminatorTexts.length === 1) {
    return 0;
  }

  const splitedBySeparatorTexts = splitedByTerminatorTexts[0].split(rubySeparatorCharacter);
  if (splitedBySeparatorTexts.length !== 2) {
    return 0;
  }

  return splitedByTerminatorTexts[0].length;
};

const createRubiedTextFromToken = (token: IpadicFeatures) => {
  const { surface_form: rawSurfaceForm, reading: rawReading } = token;
  if (rawReading === undefined) {
    return rawSurfaceForm;
  }

  const surfaceForm = convertKatakanaToHiragana(rawSurfaceForm);
  const reading = convertKatakanaToHiragana(rawReading);
  if (surfaceForm === reading) {
    return rawSurfaceForm;
  }

  const okuriganaLength = getOkuriganaLength(surfaceForm, reading);
  const oyamojiLength = surfaceForm.length - okuriganaLength;
  const yomiganaLength = reading.length - okuriganaLength;

  const oyamoji = surfaceForm.slice(0, oyamojiLength);
  const yomigana = reading.slice(0, yomiganaLength);
  const okurigana = reading.slice(yomiganaLength);

  return `${rubyAnchorCharacter}${oyamoji}${rubySeparatorCharacter}${yomigana}${rubyTerminatorCharacter}${okurigana}`;
};

const getOkuriganaLength = (surfaceForm: string, reading: string) => {
  const lastCharIndexOfSurfaceForm = surfaceForm.length - 1;
  const lastCharIndexOfReading = reading.length - 1;

  let okuriganaLength = 0;

  while (
    surfaceForm[lastCharIndexOfSurfaceForm - okuriganaLength] === reading[lastCharIndexOfReading - okuriganaLength]
  ) {
    okuriganaLength += 1;
  }

  return okuriganaLength;
};

let cachedTokenizer: Tokenizer<IpadicFeatures>;
