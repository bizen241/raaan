import { Button, Classes, Divider } from "@blueprintjs/core";
import { useCallback, useEffect, useRef, useState } from "react";
import * as React from "react";
import { EntityEditorProps } from ".";
import { ExerciseDetail } from "../../../shared/api/entities";
import { contentActions } from "../../actions/exerciseDetail";
import { connector } from "../../reducers";
import { dialogActions } from "../../reducers/dialog";
import { QuestionEditor } from "../content/editors/QuestionEditor";
import { ExercisePreviewer } from "../content/previewer/ExercisePreviewer";
import { QuestionPreviewer } from "../content/previewer/QuestionPreviewer";
import { Column } from "../ui";
import { manageHotKey } from "../utils/hotKey";

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
    const appendButtonRef = useRef<HTMLButtonElement>(null);

    const [focusedItemIndex, focus] = useState(0);

    useEffect(
      manageHotKey(
        {
          t: () => titleInputRef.current && titleInputRef.current.focus(),
          a: () => appendButtonRef.current && appendButtonRef.current.click()
        },
        isVisible
      ),
      [isVisible]
    );

    return (
      <Column flex={1}>
        <Column padding="vertical">
          <label className={Classes.LABEL}>
            題名
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
          <Column padding="vertical">問題</Column>
          {questions.map((item, index) => (
            <Column key={item.id} padding="vertical">
              <QuestionEditor bufferId={bufferId} itemIndex={index} item={item} onFocus={focus} />
            </Column>
          ))}
          <Column padding="vertical">
            <button
              className={`${Classes.BUTTON} ${Classes.LARGE} ${Classes.INTENT_PRIMARY}`}
              autoFocus
              onClick={useCallback(() => appendItem(bufferId), [])}
              ref={appendButtonRef}
            >
              追加
            </button>
          </Column>
        </Column>
        <Divider />
        <Column padding="vertical">
          <Button large onClick={useCallback(() => openDialog("ExercisePreviewer"), [])}>
            プレビュー
          </Button>
        </Column>
        <ExercisePreviewer params={buffer.edited} />
        <QuestionPreviewer question={questions[focusedItemIndex]} />
      </Column>
    );
  }
);
