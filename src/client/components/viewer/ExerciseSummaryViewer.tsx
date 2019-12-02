import { Link } from "@material-ui/core";
import {
  Delete,
  Edit,
  Group,
  History,
  HowToVote,
  Keyboard,
  Lock,
  Public,
  Refresh,
  ReportProblem,
  SmsFailed
} from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  Exercise,
  ExerciseObjection,
  ExerciseReport,
  ExerciseSummary,
  ExerciseVote
} from "../../../shared/api/entities";
import { withEntity } from "../../enhancers/withEntity";
import { useEntity } from "../../hooks/useEntity";
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
import { Card, Menu, MenuItem, Property, Row } from "../ui";

export const ExerciseSummaryViewer = withEntity<ExerciseSummary>({ entityType: "ExerciseSummary" })(
  React.memo(({ entity: exerciseSummary }) => {
    const currentUser = useContext(UserContext);

    const isOwner = currentUser.permission === "Owner";
    const isAuthor = exerciseSummary.authorId === currentUser.id;

    const { exerciseId } = exerciseSummary;

    const [isPublishExerciseDialogOpen, onTogglePublishExerciseDialog] = useToggleState();
    const [isUnpublishExerciseDialogOpen, onToggleUnpublishExerciseDialog] = useToggleState();
    const [isGroupExercisesDialogOpen, onToggleGroupExercisesDialog] = useToggleState();
    const [isDeleteExerciseDialogOpen, onToggleDeleteExerciseDialog] = useToggleState();
    const [isUploadVoteDialogOpen, onToggleUploadVoteDialog] = useToggleState();
    const [isDeleteVoteDialogOpen, onToggleDeleteVoteDialog] = useToggleState();
    const [isConfirmReportDialogOpen, onToggleConfirmReportDialog] = useToggleState();

    const { onReload: onReloadExercise } = useEntity<Exercise>("Exercise", exerciseId, false);

    const { entities: votes } = useSearch<ExerciseVote>(
      "ExerciseVote",
      {
        voterId: currentUser.id,
        targetId: exerciseId
      },
      !isAuthor
    );
    const { entities: reports } = useSearch<ExerciseReport>(
      "ExerciseReport",
      {
        reporterId: currentUser.id,
        targetId: exerciseId
      },
      !isAuthor
    );
    const { entities: objections } = useSearch<ExerciseObjection>(
      "ExerciseObjection",
      {
        objectorId: currentUser.id,
        targetId: exerciseId
      },
      exerciseSummary.isLocked
    );

    const objectionBuffers = useSelector((state: RootState) => state.buffers.ExerciseObjection);
    const reportBuffers = useSelector((state: RootState) => state.buffers.ExerciseReport);

    const vote = votes[0];
    const report = reports[0];
    const objection = objections[0];

    const reportId =
      report !== undefined
        ? report.id
        : Object.keys(reportBuffers).find(bufferId => {
            const buffer = reportBuffers[bufferId];

            return buffer !== undefined && buffer.targetId === exerciseId;
          });
    const objectionId =
      objection !== undefined
        ? objection.id
        : Object.keys(objectionBuffers).find(bufferId => {
            const buffer = objectionBuffers[bufferId];

            return buffer !== undefined && buffer.targetId === exerciseId;
          });

    const isVoted = vote !== undefined;
    const isReported = reportId !== undefined;
    const isObjected = objectionId !== undefined;

    return (
      <Card
        icon={<Keyboard />}
        title={exerciseSummary.title}
        action={
          isAuthor ? (
            <Menu>
              <MenuItem icon={<Edit />} label="編集する" to={`/exercises/${exerciseId}/edit`} />
              <MenuItem icon={<History />} label="編集履歴" to={`/exercises/${exerciseId}/revisions`} />
              {exerciseSummary.isPrivate ? (
                <MenuItem icon={<Public />} label="公開する" onClick={onTogglePublishExerciseDialog} />
              ) : (
                <MenuItem icon={<Lock />} label="非公開にする" onClick={onToggleUnpublishExerciseDialog} />
              )}
              <MenuItem icon={<Group />} label="グループに公開する" onClick={onToggleGroupExercisesDialog} />
              {exerciseSummary.isLocked &&
                (!isObjected ? (
                  <MenuItem icon={<SmsFailed />} label="異議を申し立てる" />
                ) : (
                  <MenuItem
                    icon={<SmsFailed />}
                    label="異議申し立てを編集する"
                    to={`/exercise-objections/${objectionId}/edit`}
                  />
                ))}
              <MenuItem icon={<Delete />} label="削除する" onClick={onToggleDeleteExerciseDialog} />
              <MenuItem icon={<Refresh />} label="再読み込み" onClick={onReloadExercise} />
            </Menu>
          ) : (
            <Menu>
              {!isVoted ? (
                <MenuItem icon={<HowToVote />} label="投票する" onClick={onToggleUploadVoteDialog} />
              ) : (
                <MenuItem icon={<HowToVote />} label="投票を取り消す" onClick={onToggleDeleteVoteDialog} />
              )}
              {isOwner ? (
                <MenuItem
                  icon={<ReportProblem />}
                  label="通報の一覧"
                  to={`/exercises/${exerciseId}/exercise-reports`}
                />
              ) : !isReported ? (
                <MenuItem icon={<ReportProblem />} label="通報する" onClick={onToggleConfirmReportDialog} />
              ) : (
                <MenuItem icon={<ReportProblem />} label="通報を編集する" to={`/exercise-reports/${reportId}/edit`} />
              )}
              <MenuItem icon={<Refresh />} label="再読み込み" onClick={onReloadExercise} />
            </Menu>
          )
        }
      >
        <Property label="提出回数">{exerciseSummary.submitCount}</Property>
        <Property label="評価">{exerciseSummary.upvoteCount}</Property>
        {exerciseSummary.tags && (
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
        )}
        <Property label="作者">
          <Link underline="always" color="textPrimary" component={RouterLink} to={`/users/${exerciseSummary.authorId}`}>
            {exerciseSummary.authorName || "名無しさん"}
          </Link>
        </Property>
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
