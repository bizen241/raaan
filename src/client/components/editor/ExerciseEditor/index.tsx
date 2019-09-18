import { Box, Button, Card, CardContent, TextField, Typography } from "@material-ui/core";
import { CloudUpload, PlayArrow } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useState } from "react";
import { ExerciseDraft, Question } from "../../../../shared/api/entities";
import { withBuffer } from "../../../enhancers/withBuffer";
import { ExercisePreviewer } from "../../player/dialogs/ExercisePreviewer";
import { useStyles } from "../../ui/styles";
import { QuestionsEditor } from "./QuestionsEditor";

export const ExerciseDraftEditor = withBuffer<ExerciseDraft>(
  "ExerciseDraft",
  React.memo(({ buffer = {}, source = {}, onChange, onUpload }) => {
    const classes = useStyles();

    const [isExercisePreviewerOpen, toggleExercisePreviewer] = useState(false);
    const onToggleExercisePreviewer = useCallback(() => toggleExercisePreviewer(s => !s), []);

    const onUploadAsDraft = useCallback(() => {
      onChange({ isMerged: false });
      onUpload();
    }, []);

    const onUpdateTitle = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => onChange({ title: e.target.value }),
      []
    );
    const onUpdateTags = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => onChange({ tags: e.target.value.split(/\s/) }),
      []
    );
    const onUpdateQuestions = useCallback((questions: Question[]) => onChange({ questions }), []);

    return (
      <Box display="flex" flexDirection="column" flex={1}>
        <Box display="flex" flexDirection="column" pb={1}>
          <Button className={classes.largeButton} variant="contained" onClick={onUploadAsDraft}>
            <CloudUpload className={classes.leftIcon} />
            <Typography>下書き保存</Typography>
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
