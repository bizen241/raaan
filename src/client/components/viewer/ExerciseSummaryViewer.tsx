import { Box, Card, CardContent, CardHeader, Chip, MenuItem, Typography } from "@material-ui/core";
import { Delete, Edit, HowToVote, Lock, Public, ReportProblem } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { ExerciseReport, ExerciseSummary, ExerciseVote } from "../../../shared/api/entities";
import { withEntity } from "../../enhancers/withEntity";
import { useSearch } from "../../hooks/useSearch";
import { useToggleState } from "../../hooks/useToggleState";
import { RootState } from "../../reducers";
import { DeleteExerciseDialog } from "../dialogs/exercises/DeleteExerciseDialog";
import { DeleteExerciseVoteDialog } from "../dialogs/exercises/DeleteExerciseVoteDialog";
import { PublishExerciseDialog } from "../dialogs/exercises/PublishExerciseDialog";
import { UnpublishExerciseDialog } from "../dialogs/exercises/UnpublishExerciseDialog";
import { UploadExerciseVoteDialog } from "../dialogs/exercises/UploadExerciseVoteDialog";
import { ConfirmExerciseReportDialog } from "../dialogs/reports/ConfirmExerciseReportDialog";
import { UserContext } from "../project/Context";
import { Column, Menu, Property, Row } from "../ui";
import { useStyles } from "../ui/styles";

export const ExerciseSummaryViewer = withEntity<ExerciseSummary>({ entityType: "ExerciseSummary" })(
  React.memo(({ entity: exerciseSummary }) => {
    const classes = useStyles();
    const currentUser = useContext(UserContext);

    const { exerciseId } = exerciseSummary;

    const [isPublishExerciseDialogOpen, onTogglePublishExerciseDialog] = useToggleState();
    const [isUnpublishExerciseDialogOpen, onToggleUnpublishExerciseDialog] = useToggleState();
    const [isDeleteExerciseDialogOpen, onToggleDeleteExerciseDialog] = useToggleState();
    const [isUploadVoteDialogOpen, onToggleUploadVoteDialog] = useToggleState();
    const [isDeleteVoteDialogOpen, onToggleDeleteVoteDialog] = useToggleState();
    const [isConfirmReportDialogOpen, onToggleConfirmReportDialog] = useToggleState();

    const { entities: votes } = useSearch<ExerciseVote>("ExerciseVote", {
      voterId: currentUser.id,
      targetId: exerciseId
    });
    const { entities: reports } = useSearch<ExerciseReport>("ExerciseReport", {
      reporterId: currentUser.id
    });
    const reportBuffers = useSelector((state: RootState) => state.buffers.ExerciseReport);

    const vote = votes[0];
    const report = reports[0];
    const reportBuffer = Object.values(reportBuffers).find(
      buffer => buffer !== undefined && buffer.targetId === exerciseId
    );

    const isAuthor = exerciseSummary.authorId !== currentUser.id;
    const isVoted = vote !== undefined;
    const isReported = report !== undefined || reportBuffer !== undefined;

    const reportId = report !== undefined ? report.id : reportBuffer && reportBuffer.id;

    return (
      <Card>
        <CardHeader
          title={
            <Typography variant="h6" gutterBottom>
              {exerciseSummary.title}
            </Typography>
          }
          subheader={
            <Row>
              {exerciseSummary.tags.split(/\s/).map(
                tag =>
                  tag && (
                    <Box key={tag} pr={1} pb={1}>
                      <Chip label={tag} clickable component={RouterLink} to={`/tags/${tag}`} />
                    </Box>
                  )
              )}
            </Row>
          }
          action={
            isAuthor ? (
              <Menu>
                <MenuItem component={RouterLink} to={`/exercises/${exerciseId}/edit`}>
                  <Edit className={classes.leftIcon} />
                  編集する
                </MenuItem>
                {exerciseSummary.isPrivate ? (
                  <MenuItem onClick={onTogglePublishExerciseDialog}>
                    <Public className={classes.leftIcon} />
                    公開する
                  </MenuItem>
                ) : (
                  <MenuItem onClick={onToggleUnpublishExerciseDialog}>
                    <Lock className={classes.leftIcon} />
                    非公開にする
                  </MenuItem>
                )}
                <MenuItem onClick={onToggleDeleteExerciseDialog}>
                  <Delete className={classes.leftIcon} />
                  削除する
                </MenuItem>
              </Menu>
            ) : (
              <Menu>
                {!isVoted ? (
                  <MenuItem onClick={onToggleUploadVoteDialog}>
                    <HowToVote className={classes.leftIcon} />
                    投票する
                  </MenuItem>
                ) : (
                  <MenuItem onClick={onToggleDeleteVoteDialog}>
                    <HowToVote className={classes.leftIcon} />
                    投票を取り消す
                  </MenuItem>
                )}
                {!isReported ? (
                  <MenuItem onClick={onToggleConfirmReportDialog}>
                    <ReportProblem className={classes.leftIcon} />
                    通報する
                  </MenuItem>
                ) : (
                  <MenuItem component={RouterLink} to={`/exercise-reports/${reportId}/edit`}>
                    <ReportProblem className={classes.leftIcon} />
                    通報を編集する
                  </MenuItem>
                )}
              </Menu>
            )
          }
        />
        <CardContent>
          <Column>
            <Property label="提出回数">{exerciseSummary.submitCount}</Property>
            <Property label="評価">{exerciseSummary.upvoteCount}</Property>
          </Column>
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
        <UploadExerciseVoteDialog
          exerciseId={exerciseId}
          isOpen={isUploadVoteDialogOpen}
          onClose={onToggleUploadVoteDialog}
        />
        {vote && (
          <DeleteExerciseVoteDialog
            exerciseId={exerciseId}
            exerciseVoteId={vote.id}
            isOpen={isDeleteVoteDialogOpen}
            onClose={onToggleDeleteVoteDialog}
          />
        )}
        <ConfirmExerciseReportDialog
          targetId={exerciseId}
          isOpen={isConfirmReportDialogOpen}
          onClose={onToggleConfirmReportDialog}
        />
      </Card>
    );
  })
);
