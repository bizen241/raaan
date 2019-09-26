import { Box, Button, Card, CardContent, TextField, Typography } from "@material-ui/core";
import { CloudUpload, PlayArrow } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useContext } from "react";
import { ExerciseDraft, Question } from "../../../../shared/api/entities";
import { withBuffer } from "../../../enhancers/withBuffer";
import { useToggleState } from "../../../hooks/useToggleState";
import { UploadExerciseDraftDialog } from "../../dialogs/UploadExerciseDraftDialog";
import { ExercisePreviewer } from "../../player/dialogs/ExercisePreviewer";
import { UserContext } from "../../project/Context";
import { useStyles } from "../../ui/styles";
import { QuestionsEditor } from "./QuestionsEditor";

export const ExerciseDraftEditor = withBuffer<ExerciseDraft>(
  "ExerciseDraft",
  React.memo(props => {
    const { bufferId, buffer = {}, source = {}, onChange } = props;

    const classes = useStyles();
    const currentUser = useContext(UserContext);

    const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();
    const [isExercisePreviewerOpen, onToggleExercisePreviewer] = useToggleState();

    const onUpdateTitle = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => onChange({ title: e.target.value }),
      []
    );
    const onUpdateTags = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => onChange({ tags: e.target.value.split(/\s/) }),
      []
    );
    const onUpdateQuestions = useCallback((questions: Question[]) => onChange({ questions }), []);

    const canUpload = props.buffer !== undefined && currentUser.permission !== "Guest";

    return (
      <Box display="flex" flexDirection="column" flex={1}>
        <Box display="flex" flexDirection="column" pb={1}>
          <Button
            className={classes.largeButton}
            variant="contained"
            disabled={!canUpload}
            onClick={onToggleUploadDialog}
          >
            <CloudUpload className={classes.leftIcon} />
            <Typography>アップロード</Typography>
          </Button>
        </Box>
        <Card>
          <CardContent>
            <Box display="flex" flexDirection="column" pb={1}>
              <Box display="flex" flexDirection="column" component="label">
                <Typography color="textSecondary">題名</Typography>
                <TextField
                  variant="outlined"
                  defaultValue={buffer.title || source.title || ""}
                  onChange={onUpdateTitle}
                />
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" pb={1}>
              <Box display="flex" flexDirection="column" component="label">
                <Typography color="textSecondary">タグ</Typography>
                <TextField
                  variant="outlined"
                  defaultValue={(buffer.tags || source.tags || []).join(" ")}
                  onChange={onUpdateTags}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>
        <Box display="flex" flexDirection="column" pb={1}>
          <QuestionsEditor questions={buffer.questions || source.questions || []} onChange={onUpdateQuestions} />
        </Box>
        <Box display="flex" flexDirection="column" pb={1}>
          <Button
            className={classes.largeButton}
            variant="contained"
            color="secondary"
            onClick={onToggleExercisePreviewer}
          >
            <PlayArrow className={classes.leftIcon} />
            <Typography>プレビュー</Typography>
          </Button>
        </Box>
        <UploadExerciseDraftDialog
          exerciseDraftId={bufferId}
          isOpen={isUploadDialogOpen}
          onClose={onToggleUploadDialog}
        />
        <ExercisePreviewer
          exercise={{
            ...buffer,
            ...source
          }}
          isOpen={isExercisePreviewerOpen}
          onClose={onToggleExercisePreviewer}
        />
      </Box>
    );
  })
);
