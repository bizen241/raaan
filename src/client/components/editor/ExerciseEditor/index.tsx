import { Box, Button, Dialog, Divider, TextField } from "@material-ui/core";
import { PlayArrow } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { EntityEditor, EntityEditorContainerProps, EntityEditorRendererProps } from "../";
import { Exercise } from "../../../../shared/api/entities";
import { actions } from "../../../reducers";
import { ExercisePreviewer } from "../../player/ExercisePreviewer";
import { useStyles } from "../../ui/styles";
import { QuestionsEditor } from "./QuestionsEditor";
import { TagsEditor } from "./TagsEditor";

export const ExerciseEditor = React.memo<EntityEditorContainerProps>(props => (
  <EntityEditor {...props} entityType="Exercise" rendererComponent={ExerciseEditorRenderer} />
));

const ExerciseEditorRenderer = React.memo<EntityEditorRendererProps<Exercise>>(({ bufferId, buffer }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { title, questions = [], tags = [] } = buffer.edited;

  const [isExercisePreviewerOpen, toggleExercisePreviewer] = useState(false);
  const onToggleExercisePreviewer = useCallback(() => toggleExercisePreviewer(s => !s), []);

  const onUpdateTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch(actions.buffers.update<Exercise>("Exercise", bufferId, { title: e.target.value })),
    []
  );

  return (
    <Box display="flex" flexDirection="column" flex={1}>
      <Box display="flex" flexDirection="column" py={1}>
        <TextField variant="outlined" label="題名" value={title} onChange={onUpdateTitle} />
      </Box>
      <Box display="flex" flexDirection="column" pb={1}>
        <TagsEditor exerciseId={bufferId} tags={tags} />
      </Box>
      <Box pb={1}>
        <Divider variant="middle" />
      </Box>
      <Box display="flex" flexDirection="column" pb={1}>
        <QuestionsEditor exerciseId={bufferId} questions={questions} />
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
      <Dialog fullScreen open={isExercisePreviewerOpen} onClose={onToggleExercisePreviewer}>
        <ExercisePreviewer exercise={buffer.edited} onClose={onToggleExercisePreviewer} />
      </Dialog>
    </Box>
  );
});
