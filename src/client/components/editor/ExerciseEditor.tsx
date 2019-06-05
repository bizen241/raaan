import { Box, Button, Dialog, TextField } from "@material-ui/core";
import { Add, PlayArrow } from "@material-ui/icons";
import { useCallback, useRef, useState } from "react";
import * as React from "react";
import { EntityEditor, EntityEditorContainerProps, EntityEditorRendererProps } from ".";
import { Exercise } from "../../../shared/api/entities";
import { connector } from "../../reducers";
import { QuestionEditor } from "../exercise/editors/QuestionEditor";
import { ExercisePlayer } from "../exercise/player/ExercisePlayer";

export const ExerciseEditor = React.memo<EntityEditorContainerProps>(props => (
  <EntityEditor {...props} entityType="Exercise" rendererComponent={ExerciseEditorRenderer} />
));

const ExerciseEditorRenderer = connector(
  (_, ownProps: EntityEditorRendererProps<Exercise>) => ({
    ...ownProps
  }),
  actions => ({
    ...actions.exercise
  }),
  ({ bufferId, buffer, updateTitle, appendQuestion }) => {
    const { title, questions = [] } = buffer.edited;

    const titleInputRef = useRef<HTMLInputElement>(null);
    const appendButtonRef = useRef<HTMLButtonElement>(null);

    const [focusedQuestionIndex, focusQuestion] = useState(0);
    const onFocusQuestion = React.useCallback((questionIndex: number) => focusQuestion(questionIndex), []);

    const [isExercisePreviewerOpen, toggleExercisePreviewer] = useState(false);
    const [isQuestionPreviewerOpen, toggleQuestionPreviewer] = useState(false);

    const onToggleExercisePreviewer = React.useCallback(() => toggleExercisePreviewer(s => !s), []);
    const onToggleQuestionPreviewer = React.useCallback(() => toggleQuestionPreviewer(s => !s), []);

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
          <Button variant="contained" size="large" color="secondary" onClick={onToggleExercisePreviewer}>
            <PlayArrow style={{ marginRight: "0.5em" }} />
            プレビュー
          </Button>
        </Box>
        {questions.map((question, index) => (
          <Box key={question.id} display="flex" flexDirection="column" py={1}>
            <QuestionEditor
              bufferId={bufferId}
              questionIndex={index}
              question={question}
              onFocus={onFocusQuestion}
              onPreview={onToggleQuestionPreviewer}
            />
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
        <Dialog fullScreen open={isExercisePreviewerOpen} onClose={onToggleExercisePreviewer}>
          <ExercisePlayer exerciseId={bufferId} isPreview onClose={onToggleExercisePreviewer} />
        </Dialog>
        <Dialog fullScreen open={isQuestionPreviewerOpen} onClose={onToggleQuestionPreviewer}>
          <ExercisePlayer
            exerciseId={bufferId}
            questionIndex={focusedQuestionIndex}
            isPreview
            onClose={onToggleQuestionPreviewer}
          />
        </Dialog>
      </Box>
    );
  }
);
