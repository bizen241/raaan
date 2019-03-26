import { Button, Classes, ControlGroup, Divider } from "@blueprintjs/core";
import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { EntityEditorProps } from "..";
import { ExerciseDetail } from "../../../../shared/api/entities";
import { Question } from "../../../../shared/content";
import { contentActions } from "../../../actions/exerciseDetail";
import { connector } from "../../../reducers";
import { dialogActions } from "../../../reducers/dialog";
import { ExercisePreviewer } from "../../content/previewer/ExercisePreviewer";
import { QuestionPreviewer } from "../../content/previewer/QuestionPreviewer";
import { Column } from "../../ui";
import { manageHotKey } from "../../utils/hotKey";
import { contentItemTypeToLabel, QuestionEditor } from "./QuestionEditor";

export const ExerciseDetailEditor = connector(
  (state, ownProps: EntityEditorProps<ExerciseDetail>) => ({
    ...ownProps,
    isVisible: state.dialog.name == null
  }),
  () => ({
    ...contentActions,
    openDialog: dialogActions.open
  }),
  ({ bufferId, buffer, isVisible, updateTitle, appendItem, openDialog }) => {
    const { title, questions = [] } = buffer.edited;

    const titleInputRef = useRef<HTMLInputElement>(null);
    const itemTypeSelectorRef = useRef<HTMLSelectElement>(null);
    const appendButtonRef = useRef<HTMLButtonElement>(null);

    const [focusedItemIndex, focus] = useState(0);
    const [selectedItemType, selectItemType] = useState(
      questions.length !== 0 ? questions[questions.length - 1].type : "text"
    );

    useEffect(
      manageHotKey(
        {
          t: () => titleInputRef.current && titleInputRef.current.focus(),
          s: () => itemTypeSelectorRef.current && itemTypeSelectorRef.current.focus(),
          a: () => appendButtonRef.current && appendButtonRef.current.click()
        },
        isVisible
      ),
      [isVisible]
    );

    return (
      <Column flex={1}>
        <Column padding>
          <label className={Classes.LABEL}>
            タイトル (t)
            <Column>
              <input
                className={Classes.INPUT}
                defaultValue={title}
                ref={titleInputRef}
                onChange={useCallback(
                  (e: React.ChangeEvent<HTMLInputElement>) => updateTitle(bufferId, e.target.value),
                  []
                )}
              />
            </Column>
          </label>
        </Column>
        <Divider />
        <Column>
          <Column padding>アイテム</Column>
          {questions.map((item, index) => (
            <Column key={item.id} padding>
              <QuestionEditor bufferId={bufferId} itemIndex={index} item={item} onFocus={focus} />
            </Column>
          ))}
          <Column padding>
            <ControlGroup fill>
              <div className={`${Classes.SELECT} ${Classes.FIXED} ${Classes.LARGE}`}>
                <select
                  value={selectedItemType}
                  ref={itemTypeSelectorRef}
                  onChange={useCallback(
                    (e: React.ChangeEvent<HTMLSelectElement>) => selectItemType(e.target.value as Question["type"]),
                    []
                  )}
                >
                  {Object.entries(contentItemTypeToLabel).map(([itemType, label]) => (
                    <option key={itemType} value={itemType}>
                      {label} {itemType === selectedItemType ? "(s)" : null}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className={`${Classes.BUTTON} ${Classes.LARGE} ${Classes.INTENT_PRIMARY}`}
                autoFocus
                onClick={useCallback(() => appendItem(bufferId, selectedItemType), [selectedItemType])}
                ref={appendButtonRef}
              >
                追加 (a)
              </button>
            </ControlGroup>
          </Column>
        </Column>
        <Divider />
        <Column padding>
          <Button large onClick={useCallback(() => openDialog("ExercisePreviewer"), [])}>
            プレビュー (P)
          </Button>
        </Column>
        <ExercisePreviewer params={buffer.edited} />
        <QuestionPreviewer question={questions[focusedItemIndex]} />
      </Column>
    );
  }
);