import { useCallback, useState } from "react";

export const useToggleState = () => {
  const [isOpen, toggle] = useState(false);
  const onToggle = useCallback(() => toggle(s => !s), []);

  return [isOpen, onToggle] as const;
};
