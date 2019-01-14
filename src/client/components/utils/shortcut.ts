export interface ShortcutMap {
  [key: string]: () => any | undefined;
}

export const createShortcutHandler = (shortcutMap: ShortcutMap) => (e: KeyboardEvent) => {
  const key = e.key;
  const target = e.target as HTMLElement | null;
  const tagName = target && target.tagName;

  if (key !== "Escape" && (tagName === "INPUT" || tagName === "TEXTAREA")) {
    return;
  }

  const handler = shortcutMap[key];
  if (handler === undefined) {
    return;
  }

  e.preventDefault();

  handler();
};
