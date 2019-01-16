import * as React from "react";
import { ContentItem } from "../../../../shared/content";
import { Select } from "../../ui";

const contentItemTypeToLabel: { [T in ContentItem["type"]]: string } = {
  code: "コード",
  kanji: "漢字",
  math: "数式",
  text: "テキスト"
};

export const ContentItemTypeSelector: React.FunctionComponent<{
  selectRef: React.RefObject<HTMLSelectElement>;
  selected: ContentItem["type"];
  onChange: (type: ContentItem["type"]) => void;
}> = ({ selectRef, selected, onChange }) => {
  return (
    <Select
      ref={selectRef}
      value={selected}
      onChange={e => e.currentTarget && onChange(e.currentTarget.value as ContentItem["type"])}
    >
      {Object.entries(contentItemTypeToLabel).map(([type, label]) => (
        <option key={type} value={type}>
          {label}
        </option>
      ))}
    </Select>
  );
};
