import { Button, Divider, TextField } from "@material-ui/core";
import { Add, PlayArrow } from "@material-ui/icons";
import { useCallback, useEffect, useRef, useState } from "react";
import * as React from "react";
import { EntityEditorProps } from ".";
import { Exercise } from "../../../shared/api/entities";
import { connector } from "../../reducers";
import { QuestionEditor } from "../exercise/editors/QuestionEditor";
import { ExercisePreviewer } from "../exercise/previewer/ExercisePreviewer";
import { QuestionPreviewer } from "../exercise/previewer/QuestionPreviewer";
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
          <TextField
            variant="outlined"
            label="題名"
            defaultValue={title}
            inputRef={titleInputRef}
            onChange={useCallback(
              (e: React.ChangeEvent<HTMLInputElement>) => updateTitle(bufferId, e.target.value),
              []
            )}
          />
        </Column>
        <Column padding="vertical">
          <Divider variant="middle" />
        </Column>
        <Column>
          {questions.map((question, index) => (
            <Column key={question.id} padding="vertical">
              <QuestionEditor bufferId={bufferId} questionIndex={index} question={question} onFocus={focus} />
            </Column>
          ))}
          <Column padding="vertical">
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={useCallback(() => appendQuestion(bufferId), [])}
              ref={appendButtonRef}
            >
              <Add style={{ marginRight: "0.5em" }} />
              問題を追加
            </Button>
          </Column>
        </Column>
        <Column padding="vertical">
          <Divider variant="middle" />
        </Column>
        <Column padding="vertical">
          <Button variant="contained" size="large" onClick={useCallback(() => openDialog("ExercisePreviewer"), [])}>
            <PlayArrow style={{ marginRight: "0.5em" }} />
            プレビュー
          </Button>
        </Column>
        <ExercisePreviewer params={buffer.edited} />
        <QuestionPreviewer question={questions[focusedItemIndex]} />
      </Column>
    );
  }
);
