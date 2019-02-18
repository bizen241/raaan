import { Classes } from "@blueprintjs/core";
import * as React from "react";
import { useCallback, useEffect, useRef } from "react";
import { Column } from "../../ui";
import { manageHotKey } from "../../utils/hotKey";

export const ContentTitleEditor = React.memo<{
  title: string;
  onChange: (title: string) => void;
}>(({ title, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(
    manageHotKey({
      t: () => inputRef.current && inputRef.current.focus()
    }),
    []
  );

  return (
    <label className={Classes.LABEL}>
      タイトル (t)
      <Column>
        <input
          className={Classes.INPUT}
          defaultValue={title}
          ref={inputRef}
          onChange={useCallback(e => onChange(e.currentTarget.value), [])}
        />
      </Column>
    </label>
  );
});
