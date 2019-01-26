import { Classes } from "@blueprintjs/core";
import * as React from "react";
import { RefObject, useEffect } from "react";
import { ContentItem } from "../../../../shared/content";
import { Column } from "../../ui";
import { manageHotKey } from "../../utils/hotKey";

const contentItemTypeToLabel: { [T in ContentItem["type"]]: string } = {
  code: "コード",
  kanji: "漢字",
  math: "数式",
  text: "テキスト"
};

export const ContentItemTypeSelector = React.memo<{
  selected: ContentItem["type"];
  selectRef: RefObject<HTMLSelectElement>;
  onChange: (type: ContentItem["type"]) => void;
}>(({ selected, selectRef, onChange }) => {
  useEffect(
    manageHotKey({
      s: () => selectRef.current && selectRef.current.focus()
    }),
    []
  );

  return (
    <Column>
      <label className={`${Classes.LABEL} ${Classes.MODIFIER_KEY}`}>
        追加するアイテムの種類 (S)
        <Column className={`${Classes.SELECT} ${Classes.MODIFIER_KEY}`}>
          <select
            ref={selectRef}
            value={selected}
            onChange={e => e.currentTarget && onChange(e.currentTarget.selectedOptions[0].value as ContentItem["type"])}
          >
            {Object.entries(contentItemTypeToLabel).map(([type, label]) => (
              <option key={type} value={type}>
                {label}
              </option>
            ))}
          </select>
        </Column>
      </label>
    </Column>
  );
});
