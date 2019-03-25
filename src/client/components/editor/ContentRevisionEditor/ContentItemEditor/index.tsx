import { Collapse, MenuItem, Tag } from "@blueprintjs/core";
import { useCallback, useState } from "react";
import * as React from "react";
import { Question } from "../../../../../shared/content";
import { contentActions } from "../../../../actions/content";
import { connector } from "../../../../reducers";
import { dialogActions } from "../../../../reducers/dialog";
import { Column, Details, PopMenu, Summary } from "../../../ui";
import { KanaItemEditor } from "./KanaItemEditor";
import { KanjiItemEditor } from "./KanjiItemEditor";
import { TextItemEditor } from "./TextItemEditor";

export const QuestionEditor = connector(
  (
    _,
    ownProps: {
      bufferId: string;
      itemIndex: number;
      item: Question;
      onFocus: (itemIndex: number) => void;
    }
  ) => ({
    ...ownProps
  }),
  () => ({
    ...contentActions,
    openDialog: dialogActions.open
  }),
  ({ bufferId, item, itemIndex, updateItem, deleteItem, openDialog, onFocus }) => {
    const [isOpen, toggleEditor] = useState(true);

    const ItemEditor = contentItemEditors[item.type];

    return (
      <Details onFocus={useCallback(() => onFocus(itemIndex), [itemIndex])}>
        <Summary title={itemIndex} onClick={useCallback(() => toggleEditor(s => !s), [])}>
          <Tag minimal>{contentItemTypeToLabel[item.type]}</Tag>
          <PopMenu
            items={[
              <MenuItem
                key="p"
                text="プレビュー (p)"
                onClick={useCallback(() => openDialog("QuestionPreviewer"), [])}
              />,
              <MenuItem
                key="d"
                text="削除 (Delete)"
                onClick={useCallback(() => deleteItem(bufferId, itemIndex), [itemIndex])}
                intent="danger"
              />
            ]}
            hotKeys={{}}
          />
        </Summary>
        <Collapse isOpen={isOpen}>
          <Column padding>
            <ItemEditor
              item={item}
              onChange={useCallback(
                <P extends keyof Question>(key: P, value: Question[P]) => updateItem(bufferId, itemIndex, key, value),
                [itemIndex]
              )}
            />
          </Column>
        </Collapse>
      </Details>
    );
  }
);

export const contentItemTypeToLabel: { [T in Question["type"]]: string } = {
  code: "コード",
  kana: "かな",
  kanji: "漢字",
  math: "数式",
  text: "テキスト"
};

export type TextAreaChangeEvent = React.ChangeEvent<HTMLTextAreaElement>;

export interface QuestionEditorProps<T extends Question> {
  item: T;
  onChange: <P extends keyof T>(key: P, value: T[P]) => void;
}

export const contentItemEditors: { [T in Question["type"]]: React.FunctionComponent<QuestionEditorProps<any>> } = {
  text: TextItemEditor,
  kana: KanaItemEditor,
  kanji: KanjiItemEditor,
  code: TextItemEditor,
  math: TextItemEditor
};
