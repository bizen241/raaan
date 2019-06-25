import { Box, Button, Dialog, TextField } from "@material-ui/core";
import { Add, PlayArrow } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { EntityEditor, EntityEditorContainerProps, EntityEditorRendererProps } from "../";
import { Exercise } from "../../../../shared/api/entities";
import { actions } from "../../../reducers";
import { ExercisePreviewer } from "../../player/ExercisePreviewer";
import { useStyles } from "../../ui/styles";
import { QuestionEditor } from "./QuestionEditor";

export const ExerciseEditor = React.memo<EntityEditorContainerProps>(props => (
  <EntityEditor {...props} entityType="Exercise" rendererComponent={ExerciseEditorRenderer} />
));

const ExerciseEditorRenderer = React.memo<EntityEditorRendererProps<Exercise>>(({ bufferId, buffer }) => {
  const dispatch = useDispatch();

  const { title, questions = [] } = buffer.edited;

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

  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column" flex={1}>
      <Box display="flex" flexDirection="column" py={1}>
        <TextField variant="outlined" label="題名" defaultValue={title} onChange={onUpdateTitle} />
      </Box>
      <Box display="flex" flexDirection="column" pb={1}>
        <Button
          className={classes.largeButton}
          variant="contained"
          color="secondary"
          onClick={onToggleExercisePreviewer}
        >
          <PlayArrow className={classes.leftIcon} />
          プレビュー
        </Button>
      </Box>
      {questions.map((question, index) => (
        <Box key={question.id} display="flex" flexDirection="column" pb={1}>
          <QuestionEditor
            bufferId={bufferId}
            questionIndex={index}
            question={question}
            onFocus={onFocusQuestion}
            onPreview={onToggleQuestionPreviewer}
          />
        </Box>
      ))}
      <Box display="flex" flexDirection="column" pb={1}>
        <Button className={classes.largeButton} variant="contained" color="primary" onClick={onAppendQuestion}>
          <Add className={classes.leftIcon} />
          問題を追加
        </Button>
      </Box>
      <Dialog fullScreen open={isExercisePreviewerOpen} onClose={onToggleExercisePreviewer}>
        <ExercisePreviewer buffer={buffer.edited} onClose={onToggleExercisePreviewer} />
      </Dialog>
      <Dialog fullScreen open={isQuestionPreviewerOpen} onClose={onToggleQuestionPreviewer}>
        <ExercisePreviewer
          buffer={buffer.edited}
          questionIndex={focusedQuestionIndex}
          onClose={onToggleQuestionPreviewer}
        />
      </Dialog>
    </Box>
  );
});
