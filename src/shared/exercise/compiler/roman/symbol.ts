export const convertSymbols = (target: string) =>
  target
    .replace("ー", "-")
    .replace("。", ".")
    .replace("、", ",");
