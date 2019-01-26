import { Classes } from "@blueprintjs/core";
import * as React from "react";
import { useCallback } from "react";
import TextArea from "react-textarea-autosize";
import { TextItem } from "../../../../../shared/content";
import { Column } from "../../../ui";
import { ContentItemEditorProps, TextAreaChangeEvent } from "../ContentItemEditor";

export const TextItemEditor = React.memo<ContentItemEditorProps<TextItem>>(({ item, onChange }) => {
  const onChangeValue = useCallback((e: TextAreaChangeEvent) => onChange("value", e.currentTarget.value), []);

  return (
    <label className={`${Classes.LABEL} ${Classes.MODIFIER_KEY}`}>
      <Column>
        テキスト
        <TextArea
          className={`${Classes.INPUT} ${Classes.MODIFIER_KEY}`}
          defaultValue={item.value}
          onChange={onChangeValue}
        />
      </Column>
    </label>
  );
});
