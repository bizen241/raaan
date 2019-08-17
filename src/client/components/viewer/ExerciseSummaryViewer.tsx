import { Box, Card, CardContent, CardHeader, Chip, Divider, MenuItem, Typography } from "@material-ui/core";
import { Delete, Lock } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useContext, useState } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { createEntityViewer } from ".";
import { ExerciseSummary } from "../../../shared/api/entities";
import { RootState } from "../../reducers";
import { DeleteExerciseDialog } from "../dialogs/DeleteExerciseDialog";
import { UnpublishExerciseDialog } from "../dialogs/UnpublishExerciseDialog";
import { UserContext } from "../project/Context";
import { Menu } from "../ui/Menu";
import { useStyles } from "../ui/styles";

export const ExerciseSummaryViewer = createEntityViewer<ExerciseSummary>(
  "ExerciseSummary",
  React.memo(({ entity: exerciseSummary }) => {
    const classes = useStyles();
    const currentUser = useContext(UserContext);

    const { exerciseId } = exerciseSummary;

    const { exercise, buffer } = useSelector((state: RootState) => ({
      exercise: state.cache.get.Exercise[exerciseId],
      buffer: state.buffers.Exercise[exerciseId]
    }));

    const [isUnpublishExerciseDialogOpen, toggleUnpublishExerciseDialog] = useState(false);
    const [isDeleteExerciseDialogOpen, toggleDeleteExerciseDialog] = useState(false);
    const onToggleUnpublishExerciseDialog = useCallback(() => toggleUnpublishExerciseDialog(s => !s), []);
    const onToggleDeleteExerciseDialog = useCallback(() => toggleDeleteExerciseDialog(s => !s), []);

    const isAuthor = exerciseSummary.authorId === currentUser.id;
    const isPrivate = exercise && exercise.isPrivate;

    return (
      <Card>
        <CardHeader
          title={
            <Typography variant="h6" gutterBottom>
              {exerciseSummary.title}
            </Typography>
          }
          subheader={
            <Box display="flex">
              {exerciseSummary.tags.split(/\s/).map(tag => (
                <Box key={tag} pr={1} pb={1}>
                  <Chip label={tag} clickable component={RouterLink} to={`/tags/${tag}`} />
                </Box>
              ))}
            </Box>
          }
          action={
            <Menu>
              {!isPrivate ? (
                <MenuItem disabled={buffer !== undefined} onClick={onToggleUnpublishExerciseDialog}>
                  <Lock className={classes.leftIcon} />
                  非公開にする
                </MenuItem>
              ) : null}
              {isAuthor && (
                <MenuItem onClick={onToggleDeleteExerciseDialog}>
                  <Delete className={classes.leftIcon} />
                  削除
                </MenuItem>
              )}
            </Menu>
          }
        />
        <CardContent>
          <Box display="flex" flexDirection="column">
            <Box display="flex" flexDirection="column" mb={1}>
              <Typography color="textSecondary">提出回数</Typography>
              <Typography variant="h5" component="span">
                {exerciseSummary.submitCount}
              </Typography>
              <Divider />
            </Box>
            <Box display="flex" flexDirection="column" mb={1}>
              <Typography color="textSecondary">評価</Typography>
              <Typography variant="h5" component="span">
                {exerciseSummary.upvoteCount}
              </Typography>
              <Divider />
            </Box>
          </Box>
        </CardContent>
        <UnpublishExerciseDialog
          exerciseId={exerciseId}
          isOpen={isUnpublishExerciseDialogOpen}
          onClose={onToggleUnpublishExerciseDialog}
        />
        <DeleteExerciseDialog
          exerciseId={exerciseId}
          isOpen={isDeleteExerciseDialogOpen}
          onClose={onToggleDeleteExerciseDialog}
        />
      </Card>
    );
  })
);
