import { Classes, Collapse, MenuItem, Tag } from "@blueprintjs/core";
import * as React from "react";
import { useCallback, useState } from "react";
import TextArea from "react-textarea-autosize";
import { Question } from "../../../../shared/api/entities";
import { contentActions } from "../../../actions/exerciseDetail";
import { connector } from "../../../reducers";
import { dialogActions } from "../../../reducers/dialog";
import { Column, Details, PopMenu, Summary } from "../../ui";

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

    return (
      <Details onFocus={useCallback(() => onFocus(itemIndex), [itemIndex])}>
        <Summary title={itemIndex} isOpen={isOpen} onClick={useCallback(() => toggleEditor(s => !s), [])}>
          <Tag minimal>{item.format}</Tag>
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
            <label className={`${Classes.LABEL} ${Classes.MODIFIER_KEY}`}>
              テキスト
              <Column>
                <TextArea
                  className={`${Classes.INPUT} ${Classes.MODIFIER_KEY}`}
                  defaultValue={item.value}
                  onChange={useCallback(
                    (e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      updateItem(bufferId, itemIndex, "value", e.currentTarget.value),
                    []
                  )}
                />
              </Column>
            </label>
          </Column>
        </Collapse>
      </Details>
    );
  }
);
