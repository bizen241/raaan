import { useCallback, useState } from "react";

export const useMenu = () => {
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);

  return {
    anchorElement,
    onOpen: useCallback((e: React.MouseEvent<HTMLButtonElement>) => setAnchorElement(e.currentTarget), []),
    onClose: useCallback(() => setAnchorElement(null), [])
  };
};
