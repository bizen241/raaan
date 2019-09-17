import { Box, Card, CardContent, CardHeader, Chip, Divider, MenuItem, Typography } from "@material-ui/core";
import { Delete, Edit, Lock, Public } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ExerciseSummary } from "../../../shared/api/entities";
import { withEntity } from "../../enhancers/entity";
import { useToggleState } from "../dialogs";
import { DeleteExerciseDialog } from "../dialogs/DeleteExerciseDialog";
import { PublishExerciseDialog } from "../dialogs/PublishExerciseDialog";
import { UnpublishExerciseDialog } from "../dialogs/UnpublishExerciseDialog";
import { UserContext } from "../project/Context";
import { Menu } from "../ui/Menu";
import { useStyles } from "../ui/styles";

export const ExerciseSummaryViewer = withEntity<ExerciseSummary>({ entityType: "ExerciseSummary" })(
  React.memo(({ entity: exerciseSummary }) => {
    const classes = useStyles();
    const currentUser = useContext(UserContext);

    const { exerciseId } = exerciseSummary;

    const [isPublishExerciseDialogOpen, onTogglePublishExerciseDialog] = useToggleState();
    const [isUnpublishExerciseDialogOpen, onToggleUnpublishExerciseDialog] = useToggleState();
    const [isDeleteExerciseDialogOpen, onToggleDeleteExerciseDialog] = useToggleState();

    const isAuthor = exerciseSummary.authorId === currentUser.id;

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
              {exerciseSummary.tags.split(/\s/).map(
                tag =>
                  tag && (
                    <Box key={tag} pr={1} pb={1}>
                      <Chip label={tag} clickable component={RouterLink} to={`/tags/${tag}`} />
                    </Box>
                  )
              )}
            </Box>
          }
          action={
            <Menu>
              {isAuthor && (
                <MenuItem component={RouterLink} to={`/exercises/${exerciseId}/edit`}>
                  <Edit className={classes.leftIcon} />
                  編集する
                </MenuItem>
              )}
              {exerciseSummary.isPrivate ? (
                <MenuItem onClick={onTogglePublishExerciseDialog}>
                  <Public className={classes.leftIcon} />
                  公開する
                </MenuItem>
              ) : null}
              {!exerciseSummary.isPrivate ? (
                <MenuItem onClick={onToggleUnpublishExerciseDialog}>
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
        <PublishExerciseDialog
          exerciseId={exerciseId}
          isOpen={isPublishExerciseDialogOpen}
          onClose={onTogglePublishExerciseDialog}
        />
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
