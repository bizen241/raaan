import { Classes, ControlGroup } from "@blueprintjs/core";
import * as React from "react";
import { useEffect, useRef } from "react";
import { ContentItem } from "../../../../shared/content";
import { Column } from "../../ui";
import { manageHotKey } from "../../utils/hotKey";
import { contentItemTypeToLabel } from "./item";

export const ContentItemAppendButton = React.memo<{
  selected: ContentItem["type"];
  appendButtonRef: React.RefObject<HTMLButtonElement>;
  isVisible: boolean;
  onAppend: () => void;
  onSelectType: (type: ContentItem["type"]) => void;
}>(({ selected, appendButtonRef, isVisible, onAppend, onSelectType }) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(
    manageHotKey(
      {
        a: () => onAppend(),
        s: () => selectRef.current && selectRef.current.focus()
      },
      isVisible
    ),
    [isVisible]
  );

  return (
    <Column>
      種類 (s)
      <ControlGroup fill>
        <div className={`${Classes.SELECT} ${Classes.FIXED} ${Classes.LARGE}`}>
          <select ref={selectRef} value={selected} onChange={e => onSelectType(e.target.value as ContentItem["type"])}>
            {Object.entries(contentItemTypeToLabel).map(([type, label]) => (
              <option key={type} value={type}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <button
          autoFocus
          onClick={onAppend}
          className={`${Classes.BUTTON} ${Classes.LARGE} ${Classes.INTENT_PRIMARY}`}
          ref={appendButtonRef}
        >
          追加 (a)
        </button>
      </ControlGroup>
    </Column>
  );
});
