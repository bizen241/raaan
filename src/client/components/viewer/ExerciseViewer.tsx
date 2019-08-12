import { Box, Button, Typography } from "@material-ui/core";
import { Edit, PlayArrow, Public } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { createEntityViewer } from ".";
import { Exercise } from "../../../shared/api/entities";
import { actions, RootState } from "../../reducers";
import { ExercisePlayer } from "../player/ExercisePlayer";
import { UserContext } from "../project/Context";
import { useStyles } from "../ui/styles";
import { ExerciseSummaryViewer } from "./ExerciseSummaryViewer";
import { SubmissionSummaryViewer } from "./SubmissionSummaryViewer";

export const ExerciseViewer = createEntityViewer<Exercise>(
  "Exercise",
  React.memo(({ entity: exercise, entityId: exerciseId }) => {
    const classes = useStyles();
    const currentUser = useContext(UserContext);
    const dispatch = useDispatch();

    const { buffer } = useSelector((state: RootState) => ({
      buffer: state.buffers.Exercise[exerciseId]
    }));

    const [isExercisePreviewerOpen, toggleExercisePreviewer] = useState(false);
    const onToggleExercisePreviewer = useCallback(() => toggleExercisePreviewer(s => !s), []);

    const onPublish = useCallback(() => {
      dispatch(actions.buffers.add("Exercise", exerciseId));
      dispatch(actions.buffers.update<Exercise>("Exercise", exerciseId, { isPrivate: false }));
      dispatch(actions.api.upload("Exercise", exerciseId));
    }, []);

    const isGuest = currentUser.permission === "Guest";
    const { isPrivate } = exercise;

    return (
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="column" pb={1}>
          <Button
            className={classes.largeButton}
            variant="contained"
            color="primary"
            onClick={onToggleExercisePreviewer}
          >
            <PlayArrow className={classes.leftIcon} />
            <Typography>始める</Typography>
          </Button>
        </Box>
        <Box display="flex" flexDirection="column" pb={1}>
          <ExerciseSummaryViewer entityId={exercise.summaryId} />
        </Box>
        {!isGuest && (
          <Box display="flex" flexDirection="column" pb={1}>
            <SubmissionSummaryViewer submitterId={currentUser.id} exerciseId={exerciseId} />
          </Box>
        )}
        <Box display="flex" flexDirection="column" pb={1}>
          <Button
            className={classes.largeButton}
            variant="contained"
            component={RouterLink}
            to={`/exercises/${exerciseId}/edit`}
          >
            <Edit className={classes.leftIcon} />
            <Typography>{buffer !== undefined ? "編集を再開する" : "編集する"}</Typography>
          </Button>
        </Box>
        {isPrivate ? (
          <Box display="flex" flexDirection="column" pb={1}>
            <Button
              className={classes.largeButton}
              disabled={buffer !== undefined}
              variant="contained"
              onClick={onPublish}
            >
              <Public className={classes.leftIcon} />
              <Typography>公開する</Typography>
            </Button>
          </Box>
        ) : null}
        <ExercisePlayer exerciseId={exerciseId} isOpen={isExercisePreviewerOpen} onClose={onToggleExercisePreviewer} />
      </Box>
    );
  })
);
