import { Box, Button, Dialog, Divider, TextField } from "@material-ui/core";
import { PlayArrow } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useState } from "react";
import { createEntityEditor } from "../";
import { Exercise, Question } from "../../../../shared/api/entities";
import { ExercisePreviewer } from "../../player/ExercisePreviewer";
import { useStyles } from "../../ui/styles";
import { QuestionsEditor } from "./QuestionsEditor";

export const ExerciseEditor = createEntityEditor<Exercise>(
  "Exercise",
  React.memo(({ buffer, source = {}, onChange }) => {
    const classes = useStyles();

    const [isExercisePreviewerOpen, toggleExercisePreviewer] = useState(false);
    const onToggleExercisePreviewer = useCallback(() => toggleExercisePreviewer(s => !s), []);

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
          <TextField
            variant="outlined"
            label="題名"
            defaultValue={buffer.title || source.title || ""}
            onChange={onUpdateTitle}
          />
        </Box>
        <Box display="flex" flexDirection="column" pb={1}>
          <TextField
            variant="outlined"
            label="タグ"
            defaultValue={(buffer.tags || source.tags || []).join(" ")}
            onChange={onUpdateTags}
          />
        </Box>
        <Box pb={1}>
          <Divider variant="middle" />
        </Box>
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
            プレビュー
          </Button>
        </Box>
        <Dialog fullScreen open={isExercisePreviewerOpen} onClose={onToggleExercisePreviewer}>
          <ExercisePreviewer exercise={buffer} onClose={onToggleExercisePreviewer} />
        </Dialog>
      </Box>
    );
  })
);
