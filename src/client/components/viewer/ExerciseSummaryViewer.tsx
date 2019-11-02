import { Card, CardContent, CardHeader, Link, MenuItem, Typography } from "@material-ui/core";
import { Delete, Edit, Group, History, HowToVote, Lock, Public, ReportProblem } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { ExerciseReport, ExerciseSummary, ExerciseVote } from "../../../shared/api/entities";
import { withEntity } from "../../enhancers/withEntity";
import { useSearch } from "../../hooks/useSearch";
import { useToggleState } from "../../hooks/useToggleState";
import { RootState } from "../../reducers";
import { ConfirmExerciseReportDialog } from "../dialogs/exercise-reports/ConfirmExerciseReportDialog";
import { DeleteExerciseVoteDialog } from "../dialogs/exercise-votes/DeleteExerciseVoteDialog";
import { UploadExerciseVoteDialog } from "../dialogs/exercise-votes/UploadExerciseVoteDialog";
import { DeleteExerciseDialog } from "../dialogs/exercises/DeleteExerciseDialog";
import { GroupExercisesDialog } from "../dialogs/exercises/GroupExercisesDialog";
import { PublishExerciseDialog } from "../dialogs/exercises/PublishExerciseDialog";
import { UnpublishExerciseDialog } from "../dialogs/exercises/UnpublishExerciseDialog";
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
    const [isGroupExercisesDialogOpen, onToggleGroupExercisesDialog] = useToggleState();
    const [isDeleteExerciseDialogOpen, onToggleDeleteExerciseDialog] = useToggleState();
    const [isUploadVoteDialogOpen, onToggleUploadVoteDialog] = useToggleState();
    const [isDeleteVoteDialogOpen, onToggleDeleteVoteDialog] = useToggleState();
    const [isConfirmReportDialogOpen, onToggleConfirmReportDialog] = useToggleState();

    const { entities: votes } = useSearch<ExerciseVote>("ExerciseVote", {
      voterId: currentUser.id,
      targetId: exerciseId
    });
    const { entities: reports } = useSearch<ExerciseReport>("ExerciseReport", {
      reporterId: currentUser.id,
      targetId: exerciseId
    });
    const reportBuffers = useSelector((state: RootState) => state.buffers.ExerciseReport);

    const vote = votes[0];
    const report = reports[0];
    const reportId =
      report !== undefined
        ? report.id
        : Object.keys(reportBuffers).find(bufferId => {
            const buffer = reportBuffers[bufferId];

            return buffer !== undefined && buffer.targetId === exerciseId;
          });

    const isAuthor = exerciseSummary.authorId === currentUser.id;
    const isVoted = vote !== undefined;
    const isReported = reportId !== undefined;

    return (
      <Card>
        <CardHeader
          title={<Typography>{exerciseSummary.title}</Typography>}
          action={
            isAuthor ? (
              <Menu>
                <MenuItem component={RouterLink} to={`/exercises/${exerciseId}/edit`}>
                  <Edit className={classes.leftIcon} />
                  編集する
                </MenuItem>
                <MenuItem component={RouterLink} to={`/exercises/${exerciseId}/revisions`}>
                  <History className={classes.leftIcon} />
                  編集履歴
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
                <MenuItem onClick={onToggleGroupExercisesDialog}>
                  <Group className={classes.leftIcon} />
                  グループに公開する
                </MenuItem>
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
            <Property label="タグ">
              <Row>
                {exerciseSummary.tags.split(/\s/).map(
                  tag =>
                    tag && (
                      <Row key={tag} pr={1}>
                        <Link underline="always" color="textPrimary" component={RouterLink} to={`/tags/${tag}`}>
                          {tag}
                        </Link>
                      </Row>
                    )
                )}
              </Row>
            </Property>
            <Property label="作者">
              <Link
                underline="always"
                color="textPrimary"
                component={RouterLink}
                to={`/users/${exerciseSummary.authorId}`}
              >
                {exerciseSummary.authorName || "名無しさん"}
              </Link>
            </Property>
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
        <GroupExercisesDialog
          exerciseId={exerciseId}
          isOpen={isGroupExercisesDialogOpen}
          onClose={onToggleGroupExercisesDialog}
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
