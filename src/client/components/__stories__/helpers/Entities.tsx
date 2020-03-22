import React, { useEffect } from "react";
import { searchEntity } from "../../../api/client";
import { useToggleState } from "../../../hooks/useToggleState";

export const Entities: React.FunctionComponent = ({ children }) => {
  const [isReady, onReady] = useToggleState();

  useEffect(() => {
    if (isReady) {
      return;
    }

    insertEntities(onReady);
  }, []);

  if (!isReady) {
    return null;
  }

  return <>{children}</>;
};

const insertEntities = async (onFinish: () => void) => {
  const response = await searchEntity("AppDiaryEntry", {});
  if (response.count !== 0) {
    return onFinish();
  }

  await fetch("/test");

  onFinish();
};
