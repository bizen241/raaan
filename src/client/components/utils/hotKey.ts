export interface HotKeyMap {
  [key: string]: () => any | undefined;
}

export const manageHotKey = (hotKeyMap: HotKeyMap, isEnabled: boolean = true) => () => {
  if (!isEnabled) {
    return;
  }

  const handler = (e: KeyboardEvent) => {
    const key = e.key;
    const target = e.target as HTMLElement | null;
    if (target == null) {
      return;
    }

    const tagName = target.tagName;

    if (e.ctrlKey || e.altKey) {
      return;
    }
    if (target.isContentEditable) {
      return;
    }
    if (key !== "Escape" && (tagName === "INPUT" || tagName === "TEXTAREA")) {
      return;
    }

    const action = hotKeyMap[key];
    if (action === undefined) {
      return;
    }

    e.preventDefault();

    action();
  };

  document.addEventListener("keydown", handler);

  return () => {
    document.removeEventListener("keydown", handler);
  };
};
