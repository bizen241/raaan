export const katakanaToHiragana = (target: string) =>
  target.replace(/[\u30a1-\u30f6]/g, matched => String.fromCharCode(matched.charCodeAt(0) - 0x60));

export const replacePunctuationMark = (target: string) =>
  target
    .replace("ー", "-")
    .replace("。", ".")
    .replace("、", ",");
