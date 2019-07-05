import { Box, Button, Dialog, IconButton, Menu, MenuItem, Typography } from "@material-ui/core";
import { Delete, Edit, Lock, MoreVert, PlayArrow, Public } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { EntityViewer, EntityViewerContainerProps, EntityViewerRendererProps } from ".";
import { Exercise } from "../../../shared/api/entities";
import { actions, RootState } from "../../reducers";
import { ExercisePlayer } from "../player/ExercisePlayer";
import { UserContext } from "../project/Context";
import { useStyles } from "../ui/styles";
import { ExerciseSummaryViewer } from "./ExerciseSummaryViewer";
import { SubmissionSummaryViewer } from "./SubmissionSummaryViewer";

export const ExerciseViewer = React.memo<EntityViewerContainerProps>(props => {
  return <EntityViewer {...props} entityType="Exercise" renderer={ExerciseViewerRenderer} />;
});

const ExerciseViewerRenderer = React.memo<EntityViewerRendererProps<Exercise>>(
  ({ entityId: exerciseId, entity: exercise }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const currentUser = useContext(UserContext);

    const [isExercisePreviewerOpen, toggleExercisePreviewer] = useState(false);
    const onToggleExercisePreviewer = useCallback(() => toggleExercisePreviewer(s => !s), []);

    const [menuAnchorElement, setMenuAnchorElement] = useState(null);

    const { buffer } = useSelector((state: RootState) => ({
      buffer: state.buffers.Exercise[exerciseId]
    }));

    const onPublish = useCallback(() => {
      dispatch(actions.buffers.load("Exercise", exerciseId));
      dispatch(actions.buffers.updateValue<Exercise>("Exercise", exerciseId, "isPrivate", false));
      dispatch(actions.api.upload("Exercise", exerciseId));
    }, []);
    const onUnpublish = useCallback(() => {
      dispatch(actions.buffers.load("Exercise", exerciseId));
      dispatch(actions.buffers.updateValue<Exercise>("Exercise", exerciseId, "isPrivate", true));
      dispatch(actions.api.upload("Exercise", exerciseId));
    }, []);

    const { isPrivate } = exercise;

    return (
      <Box display="flex" flexDirection="column">
        <Box display="flex" alignItems="center">
          {isPrivate ? (
            <Box>
              <IconButton disabled={buffer !== undefined} onClick={onPublish}>
                <Lock />
              </IconButton>
            </Box>
          ) : null}
          <Box flex={1} />
          <Box>
            <IconButton onClick={useCallback(e => setMenuAnchorElement(e.currentTarget), [])}>
              <MoreVert />
            </IconButton>
            <Menu
              anchorEl={menuAnchorElement}
              open={Boolean(menuAnchorElement)}
              onClose={useCallback(() => setMenuAnchorElement(null), [])}
            >
              {!isPrivate ? (
                <MenuItem disabled={buffer !== undefined} onClick={onUnpublish}>
                  <Lock className={classes.leftIcon} />
                  非公開にする
                </MenuItem>
              ) : null}
              <MenuItem onClick={useCallback(() => dispatch(actions.api.delete("Exercise", exerciseId)), [])}>
                <Delete className={classes.leftIcon} />
                削除
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        <Box pb={1}>
          <Typography variant="h4">{exercise.title || "無題"}</Typography>
        </Box>
        <Box display="flex" flexDirection="column" pb={1}>
          <Button
            className={classes.largeButton}
            variant="contained"
            color="primary"
            onClick={onToggleExercisePreviewer}
          >
            <PlayArrow className={classes.leftIcon} />
            始める
          </Button>
        </Box>
        <Box display="flex" flexDirection="column" pb={1}>
          <SubmissionSummaryViewer userId={currentUser.id} exerciseId={exerciseId} />
        </Box>
        <Box display="flex" flexDirection="column" pb={1}>
          <ExerciseSummaryViewer entityId={exercise.summaryId} />
        </Box>
        <Box display="flex" flexDirection="column" pb={1}>
          <Button
            className={classes.largeButton}
            variant="contained"
            component={RouterLink}
            to={`/exercises/${exerciseId}/edit`}
          >
            <Edit className={classes.leftIcon} />
            {buffer !== undefined ? "編集を再開する" : "編集する"}
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
              公開する
            </Button>
          </Box>
        ) : null}
        <Dialog fullScreen open={isExercisePreviewerOpen} onClose={onToggleExercisePreviewer}>
          <ExercisePlayer exerciseId={exerciseId} onClose={onToggleExercisePreviewer} />
        </Dialog>
      </Box>
    );
  }
);
