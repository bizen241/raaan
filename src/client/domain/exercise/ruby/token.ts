import { IpadicFeatures } from "kuromoji";
import { convertKatakanaToHiragana } from "../../../../shared/exercise/compiler/roman/kana";
import { rubyAnchor, rubySeparator, rubyTerminator } from "../../../../shared/exercise/ruby/characters";

export const createRubiedTextFromTokens = (tokens: IpadicFeatures[]) =>
  tokens
    .map(token => {
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

      return `${rubyAnchor}${oyamoji}${rubySeparator}${yomigana}${rubyTerminator}${okurigana}`;
    })
    .join("");

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
