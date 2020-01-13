import { Link } from "@material-ui/core";
import {
  CloudDownload,
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
  SmsFailed,
  WbIncandescent
} from "@material-ui/icons";
import React, { useCallback, useContext } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { withEntity } from "../../enhancers/withEntity";
import { useEntity } from "../../hooks/useEntity";
import { useSearch } from "../../hooks/useSearch";
import { useToggleState } from "../../hooks/useToggleState";
import { RootState } from "../../reducers";
import { DeleteExerciseVoteDialog } from "../dialogs/exercise-votes/DeleteExerciseVoteDialog";
import { UploadExerciseVoteDialog } from "../dialogs/exercise-votes/UploadExerciseVoteDialog";
import { DeleteExerciseDialog } from "../dialogs/exercises/DeleteExerciseDialog";
import { ExportExerciseDialog } from "../dialogs/exercises/ExportExerciseDialog";
import { GroupExercisesDialog } from "../dialogs/exercises/GroupExercisesDialog";
import { PublishExerciseDialog } from "../dialogs/exercises/PublishExerciseDialog";
import { UnpublishExerciseDialog } from "../dialogs/exercises/UnpublishExerciseDialog";
import { ConfirmObjectionDialog } from "../dialogs/objections/ConfirmObjectionDialog";
import { ConfirmReportDialog } from "../dialogs/reports/ConfirmReportDialog";
import { ConfirmSuggestionDialog } from "../dialogs/suggestions/ConfirmSuggestionDialog";
import { UserContext } from "../project/Context";
import { Card, Menu, MenuItem, Property, Row } from "../ui";

export const ExerciseSummaryViewer = withEntity("ExerciseSummary")(
  React.memo(({ entity: exerciseSummary }) => {
    const currentUser = useContext(UserContext);

    const isOwner = currentUser.permission === "Owner";
    const isAuthor = exerciseSummary.authorId === currentUser.id;

    const { exerciseId, title, commentCount, isDraft, isPrivate, isLocked } = exerciseSummary;

    const [isPublishExerciseDialogOpen, onTogglePublishExerciseDialog] = useToggleState();
    const [isUnpublishExerciseDialogOpen, onToggleUnpublishExerciseDialog] = useToggleState();
    const [isGroupExercisesDialogOpen, onToggleGroupExercisesDialog] = useToggleState();
    const [isDeleteExerciseDialogOpen, onToggleDeleteExerciseDialog] = useToggleState();
    const [isExportDialogOpen, onToggleExportDialog] = useToggleState();
    const [isUploadVoteDialogOpen, onToggleUploadVoteDialog] = useToggleState();
    const [isDeleteVoteDialogOpen, onToggleDeleteVoteDialog] = useToggleState();
    const [isConfirmSuggestionDialogOpen, onToggleConfirmSuggestionDialog] = useToggleState();
    const [isConfirmReportDialogOpen, onToggleConfirmReportDialog] = useToggleState();
    const [isConfirmObjectionDialogOpen, onToggleConfirmObjectionDialog] = useToggleState();

    const { entity: exercise, onReload: onReloadExercise } = useEntity("Exercise", exerciseId, false);

    const { entities: votes, onReload: onReloadExerciseVotes } = useSearch(
      "ExerciseVote",
      {
        voterId: currentUser.id,
        targetId: exerciseId
      },
      !isAuthor
    );
    const { entities: suggestions, onReload: onReloadSuggestionSummaries } = useSearch(
      "SuggestionSummary",
      {
        authorId: currentUser.id,
        exerciseId,
        state: "pending"
      },
      !isAuthor
    );
    const { entities: reports, onReload: onReloadReports } = useSearch(
      "Report",
      {
        reporterId: currentUser.id,
        targetType: "Exercise",
        targetId: exerciseId
      },
      !isAuthor
    );
    const { entities: objections, onReload: onReloadObjections } = useSearch(
      "Objection",
      {
        objectorId: currentUser.id,
        targetId: exerciseId
      },
      exerciseSummary.isLocked
    );

    const suggestionBuffers = useSelector((state: RootState) => state.buffers.Suggestion);
    const objectionBuffers = useSelector((state: RootState) => state.buffers.Objection);
    const reportBuffers = useSelector((state: RootState) => state.buffers.Report);

    const vote = votes[0];
    const suggestion = suggestions[0];
    const report = reports[0];
    const objection = objections[0];

    const suggestionId =
      suggestion !== undefined
        ? suggestion.suggestionId
        : Object.keys(suggestionBuffers).find(bufferId => {
            const buffer = suggestionBuffers[bufferId];

            return buffer !== undefined && buffer.exerciseId === exerciseId;
          });
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
    const isSuggested = suggestionId !== undefined;
    const isReported = reportId !== undefined;
    const isObjected = objectionId !== undefined;

    const onReload = useCallback(() => {
      onReloadExercise();
      onReloadExerciseVotes();
      onReloadSuggestionSummaries();
      onReloadReports();
      onReloadObjections();
    }, []);

    return (
      <Card
        icon={<Keyboard />}
        title={title || "無題"}
        action={
          isAuthor ? (
            <Menu>
              <MenuItem icon={<Edit />} label="編集する" to={`/exercises/${exerciseId}/edit`} />
              {!isDraft && <MenuItem icon={<History />} label="編集履歴" to={`/exercises/${exerciseId}/revisions`} />}
              {!isLocked &&
                (isPrivate ? (
                  <MenuItem icon={<Public />} label="公開する" onClick={onTogglePublishExerciseDialog} />
                ) : (
                  <MenuItem icon={<Lock />} label="非公開にする" onClick={onToggleUnpublishExerciseDialog} />
                ))}
              <MenuItem icon={<Group />} label="グループに公開する" onClick={onToggleGroupExercisesDialog} />
              {isLocked &&
                (!isObjected ? (
                  <MenuItem icon={<SmsFailed />} label="抗議する" onClick={onToggleConfirmObjectionDialog} />
                ) : (
                  <MenuItem icon={<SmsFailed />} label="抗議を編集する" to={`/objections/${objectionId}/edit`} />
                ))}
              <MenuItem icon={<Delete />} label="削除する" onClick={onToggleDeleteExerciseDialog} />
              {exercise && <MenuItem icon={<CloudDownload />} label="エクスポート" onClick={onToggleExportDialog} />}
              <MenuItem icon={<Refresh />} label="再読み込み" onClick={onReload} />
            </Menu>
          ) : (
            <Menu>
              {!isVoted ? (
                <MenuItem icon={<HowToVote />} label="投票する" onClick={onToggleUploadVoteDialog} />
              ) : (
                <MenuItem icon={<HowToVote />} label="投票を取り消す" onClick={onToggleDeleteVoteDialog} />
              )}
              {!isSuggested ? (
                <MenuItem icon={<WbIncandescent />} label="提案する" onClick={onToggleConfirmSuggestionDialog} />
              ) : (
                <MenuItem icon={<WbIncandescent />} label="提案を編集する" to={`/suggestions/${suggestionId}/edit`} />
              )}
              {!isOwner &&
                (!isReported ? (
                  <MenuItem icon={<ReportProblem />} label="通報する" onClick={onToggleConfirmReportDialog} />
                ) : (
                  <MenuItem icon={<ReportProblem />} label="通報を編集する" to={`/reports/${reportId}/edit`} />
                ))}
              <MenuItem icon={<Refresh />} label="再読み込み" onClick={onReload} />
            </Menu>
          )
        }
      >
        <Property label="提出回数">
          <Link
            underline="always"
            color="textPrimary"
            component={RouterLink}
            to={`/exercises/${exerciseSummary.exerciseId}/diary`}
          >
            {exerciseSummary.submitCount}
          </Link>
        </Property>
        <Property label="評価">{exerciseSummary.upvoteCount - exerciseSummary.downvoteCount}</Property>
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
        <Property label="コメント">
          <Link
            underline="always"
            color="textPrimary"
            component={RouterLink}
            to={`/exercises/${exerciseSummary.exerciseId}/comments`}
          >
            {commentCount}
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
        {exercise && (
          <ExportExerciseDialog exercise={exercise} isOpen={isExportDialogOpen} onClose={onToggleExportDialog} />
        )}
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
        {exercise && (
          <ConfirmSuggestionDialog
            exercise={exercise}
            isOpen={isConfirmSuggestionDialogOpen}
            onClose={onToggleConfirmSuggestionDialog}
          />
        )}
        <ConfirmReportDialog
          targetType="Exercise"
          targetId={exerciseId}
          isOpen={isConfirmReportDialogOpen}
          onClose={onToggleConfirmReportDialog}
        />
        <ConfirmObjectionDialog
          targetType="Exercise"
          targetId={exerciseId}
          isOpen={isConfirmObjectionDialogOpen}
          onClose={onToggleConfirmObjectionDialog}
        />
      </Card>
    );
  })
);
