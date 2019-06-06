import { Box, Button, Dialog, TextField } from "@material-ui/core";
import { Add, PlayArrow } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { EntityEditor, EntityEditorContainerProps, EntityEditorRendererProps } from ".";
import { Exercise } from "../../../shared/api/entities";
import { actions } from "../../reducers";
import { QuestionEditor } from "../exercise/editors/QuestionEditor";
import { ExercisePlayer } from "../exercise/player/ExercisePlayer";
import { iconStyles } from "../ui/styles";

export const ExerciseEditor = React.memo<EntityEditorContainerProps>(props => (
  <EntityEditor {...props} entityType="Exercise" rendererComponent={ExerciseEditorRenderer} />
));

const ExerciseEditorRenderer = React.memo<EntityEditorRendererProps<Exercise>>(({ bufferId, buffer }) => {
  const dispatch = useDispatch();

  const { title, questions = [] } = buffer.edited;

  const titleInputRef = useRef<HTMLInputElement>(null);
  const appendButtonRef = useRef<HTMLButtonElement>(null);

  const [focusedQuestionIndex, focusQuestion] = useState(0);
  const onFocusQuestion = useCallback((questionIndex: number) => focusQuestion(questionIndex), []);

  const [isExercisePreviewerOpen, toggleExercisePreviewer] = useState(false);
  const [isQuestionPreviewerOpen, toggleQuestionPreviewer] = useState(false);

  const onToggleExercisePreviewer = useCallback(() => toggleExercisePreviewer(s => !s), []);
  const onToggleQuestionPreviewer = useCallback(() => toggleQuestionPreviewer(s => !s), []);

  const onUpdateTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => dispatch(actions.exercise.updateTitle(bufferId, e.target.value)),
    []
  );
  const onAppendQuestion = useCallback(() => dispatch(actions.exercise.appendQuestion(bufferId)), []);

  const iconClasses = iconStyles();

  return (
    <Box display="flex" flexDirection="column" flex={1}>
      <Box display="flex" flexDirection="column" py={1}>
        <TextField
          variant="outlined"
          label="題名"
          defaultValue={title}
          inputRef={titleInputRef}
          onChange={onUpdateTitle}
        />
      </Box>
      <Box display="flex" flexDirection="column" py={1}>
        <Button variant="contained" size="large" color="secondary" onClick={onToggleExercisePreviewer}>
          <PlayArrow className={iconClasses.leftIcon} />
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
        <Button variant="contained" size="large" color="primary" onClick={onAppendQuestion} ref={appendButtonRef}>
          <Add className={iconClasses.leftIcon} />
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
});
