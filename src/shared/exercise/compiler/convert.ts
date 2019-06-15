export const convertKatakanaToHiragana = (target: string) =>
  target.replace(/[\u30a1-\u30f6]/g, matched => String.fromCharCode(matched.charCodeAt(0) - 0x60));

export const convertPunctuationMark = (target: string) =>
  target
    .replace("ー", "-")
    .replace("。", ".")
    .replace("、", ",");
