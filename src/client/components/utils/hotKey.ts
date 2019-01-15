export interface HotKeyMap {
  [key: string]: () => any | undefined;
}

export const createHotKeyHandler = (hotKeyMap: HotKeyMap) => (e: KeyboardEvent) => {
  const key = e.key;
  const target = e.target as HTMLElement | null;
  const tagName = target && target.tagName;

  if (key !== "Escape" && (tagName === "INPUT" || tagName === "TEXTAREA")) {
    return;
  }

  const handler = hotKeyMap[key];
  if (handler === undefined) {
    return;
  }

  e.preventDefault();

  handler();
};
