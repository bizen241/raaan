import { Box, Button, TextField } from "@material-ui/core";
import { Add, PlayArrow } from "@material-ui/icons";
import { useCallback, useEffect, useRef, useState } from "react";
import * as React from "react";
import { EntityEditor, EntityEditorContainerProps, EntityEditorRendererProps } from ".";
import { Exercise } from "../../../shared/api/entities";
import { connector } from "../../reducers";
import { QuestionEditor } from "../exercise/editors/QuestionEditor";
import { ExercisePreviewer } from "../exercise/previewer/ExercisePreviewer";
import { QuestionPreviewer } from "../exercise/previewer/QuestionPreviewer";
import { manageHotKey } from "../utils/hotKey";

export const ExerciseEditor = React.memo<EntityEditorContainerProps>(props => (
  <EntityEditor {...props} entityType="Exercise" rendererComponent={ExerciseEditorRenderer} />
));

const ExerciseEditorRenderer = connector(
  (state, ownProps: EntityEditorRendererProps<Exercise>) => ({
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
      <Box display="flex" flexDirection="column" flex={1}>
        <Box display="flex" flexDirection="column" py={1}>
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
        </Box>
        <Box display="flex" flexDirection="column" py={1}>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={useCallback(() => openDialog("ExercisePreviewer"), [])}
          >
            <PlayArrow style={{ marginRight: "0.5em" }} />
            プレビュー
          </Button>
        </Box>
        {questions.map((question, index) => (
          <Box key={question.id} display="flex" flexDirection="column" py={1}>
            <QuestionEditor bufferId={bufferId} questionIndex={index} question={question} onFocus={focus} />
          </Box>
        ))}
        <Box display="flex" flexDirection="column" py={1}>
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
        </Box>
        <ExercisePreviewer params={buffer.edited} />
        <QuestionPreviewer question={questions[focusedItemIndex]} />
      </Box>
    );
  }
);
