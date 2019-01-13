export interface ShortcutMap {
  [key: string]: () => any | undefined;
}

export const createShortcutHandler = (shortcutMap: ShortcutMap) => (e: KeyboardEvent) => {
  const target = e.target as HTMLElement | null;
  const tagName = target && target.tagName;

  if (tagName === "INPUT" || tagName === "TEXTAREA") {
    return;
  }

  const handler = shortcutMap[e.key];
  if (handler === undefined) {
    return;
  }

  e.preventDefault();

  handler();
};
