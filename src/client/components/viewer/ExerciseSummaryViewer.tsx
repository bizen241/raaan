import { Box, Card, CardContent, CardHeader, Chip, Divider, MenuItem, Typography } from "@material-ui/core";
import { Delete, Lock } from "@material-ui/icons";
import { useCallback, useContext } from "react";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { createEntityViewer } from ".";
import { Exercise, ExerciseSummary } from "../../../shared/api/entities";
import { actions, RootState } from "../../reducers";
import { UserContext } from "../project/Context";
import { Menu } from "../ui/Menu";
import { useStyles } from "../ui/styles";

export const ExerciseSummaryViewer = createEntityViewer<ExerciseSummary>(
  "ExerciseSummary",
  React.memo(({ entity: exerciseSummary }) => {
    const classes = useStyles();
    const currentUser = useContext(UserContext);
    const dispatch = useDispatch();

    const { exerciseId } = exerciseSummary;

    const { exercise, buffer } = useSelector((state: RootState) => ({
      exercise: state.cache.get.Exercise[exerciseId],
      buffer: state.buffers.Exercise[exerciseId]
    }));

    const onDelete = useCallback(() => dispatch(actions.api.delete("Exercise", exerciseId)), []);
    const onUnpublish = useCallback(() => {
      dispatch(actions.buffers.add("Exercise", exerciseId));
      dispatch(actions.buffers.update<Exercise>("Exercise", exerciseId, { isPrivate: true }));
      dispatch(actions.api.upload("Exercise", exerciseId));
    }, []);

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
              {exerciseSummary.tags.map(tag => (
                <Box key={tag} pr={1} pb={1}>
                  <Chip label={tag} clickable component={RouterLink} to={`/tags/${tag}`} />
                </Box>
              ))}
            </Box>
          }
          action={
            <Menu>
              {!isPrivate ? (
                <MenuItem disabled={buffer !== undefined} onClick={onUnpublish}>
                  <Lock className={classes.leftIcon} />
                  非公開にする
                </MenuItem>
              ) : null}
              {isAuthor && (
                <MenuItem onClick={onDelete}>
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
      </Card>
    );
  })
);
