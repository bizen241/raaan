import { Button, Classes, Divider } from "@blueprintjs/core";
import { useCallback, useEffect, useRef, useState } from "react";
import * as React from "react";
import { EntityEditorProps } from ".";
import { Exercise } from "../../../shared/api/entities";
import { connector } from "../../reducers";
import { QuestionEditor } from "../content/editors/QuestionEditor";
import { ExercisePreviewer } from "../content/previewer/ExercisePreviewer";
import { QuestionPreviewer } from "../content/previewer/QuestionPreviewer";
import { Column } from "../ui";
import { manageHotKey } from "../utils/hotKey";

export const ExerciseEditor = connector(
  (state, ownProps: EntityEditorProps<Exercise>) => ({
    ...ownProps,
    isVisible: state.dialog.name == null
  }),
  actions => ({
    ...actions.exercise,
    openDialog: actions.dialog.open
  }),
  ({ bufferId, buffer, isVisible, updateTitle, appendQuestion, openDialog }) => {
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
          {questions.map((question, index) => (
            <Column key={question.id} padding="vertical">
              <QuestionEditor bufferId={bufferId} questionIndex={index} question={question} onFocus={focus} />
            </Column>
          ))}
          <Column padding="vertical">
            <button
              className={`${Classes.BUTTON} ${Classes.LARGE} ${Classes.INTENT_PRIMARY} ${Classes.iconClass("plus")}`}
              autoFocus
              onClick={useCallback(() => appendQuestion(bufferId), [])}
              ref={appendButtonRef}
            >
              追加
            </button>
          </Column>
        </Column>
        <Divider />
        <Column padding="vertical">
          <Button large icon="play" onClick={useCallback(() => openDialog("ExercisePreviewer"), [])}>
            プレビュー
          </Button>
        </Column>
        <ExercisePreviewer params={buffer.edited} />
        <QuestionPreviewer question={questions[focusedItemIndex]} />
      </Column>
    );
  }
);
