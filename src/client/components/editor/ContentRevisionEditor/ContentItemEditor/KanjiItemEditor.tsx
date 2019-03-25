import { Classes } from "@blueprintjs/core";
import * as React from "react";
import { useCallback } from "react";
import TextArea from "react-textarea-autosize";
import { ExerciseItemEditorProps, TextAreaChangeEvent } from ".";
import { KanjiItem } from "../../../../../shared/content";
import { Column } from "../../../ui";

export const KanjiItemEditor = React.memo<ExerciseItemEditorProps<KanjiItem>>(({ item, onChange }) => {
  const onChangeKanji = useCallback((e: TextAreaChangeEvent) => onChange("kanji", e.currentTarget.value), []);
  const onChangeKana = useCallback((e: TextAreaChangeEvent) => onChange("value", e.currentTarget.value), []);

  return (
    <Column>
      <label className={`${Classes.LABEL} ${Classes.MODIFIER_KEY}`}>
        漢字
        <Column>
          <TextArea
            className={`${Classes.INPUT} ${Classes.MODIFIER_KEY}`}
            defaultValue={item.kanji}
            onChange={onChangeKanji}
          />
        </Column>
      </label>
      <label className={`${Classes.LABEL} ${Classes.MODIFIER_KEY}`}>
        かな
        <Column>
          <TextArea
            className={`${Classes.INPUT} ${Classes.MODIFIER_KEY}`}
            defaultValue={item.value}
            onChange={onChangeKana}
          />
        </Column>
      </label>
    </Column>
  );
});
