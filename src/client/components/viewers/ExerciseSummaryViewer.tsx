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
import React from "react";
import { EntityId, Exercise } from "../../../shared/api/entities";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useEntity } from "../../hooks/useEntity";
import { useSearch } from "../../hooks/useSearch";
import { useToggleState } from "../../hooks/useToggleState";
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
import { Tags } from "../project/Tags";
import { Card, Link, Menu, MenuItem, Property } from "../ui";

export const ExerciseSummaryViewer = React.memo<{
  exerciseId: EntityId<"Exercise">;
  exercise: Exercise;
}>(({ exerciseId, exercise }) => {
  const { currentUser } = useCurrentUser();
  const isOwner = currentUser.permission === "Owner";
  const isGuest = currentUser.permission === "Guest";

  const { onReload: onReloadExercise } = useEntity("Exercise", exercise.id);
  const { entity: exerciseSummary } = useEntity("ExerciseSummary", exercise.summaryId);
  const { title, commentCount, isDraft, isPrivate, isLocked } = exerciseSummary;
  const isAuthor = exerciseSummary.authorId === currentUser.id;

  const { entities: exerciseVotes } = useSearch(
    "ExerciseVote",
    {
      voterId: currentUser.id,
      targetId: exerciseId
    },
    !isGuest && !isAuthor
  );
  const exerciseVote = exerciseVotes[0];

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

  return (
    <Card
      icon={<Keyboard />}
      title={title || "無題"}
      action={
        isAuthor ? (
          <Menu>
            <MenuItem icon={<Edit />} label="編集する" to={`/exercise-drafts/${exercise.draftId}/edit`} />
            {!isDraft && <MenuItem icon={<History />} label="編集履歴" to={`/exercises/${exerciseId}/revisions`} />}
            {!isLocked &&
              (isPrivate ? (
                <MenuItem icon={<Public />} label="公開する" onClick={onTogglePublishExerciseDialog} />
              ) : (
                <MenuItem icon={<Lock />} label="非公開にする" onClick={onToggleUnpublishExerciseDialog} />
              ))}
            <MenuItem icon={<Group />} label="グループに公開する" onClick={onToggleGroupExercisesDialog} />
            {!isLocked && <MenuItem icon={<SmsFailed />} label="抗議する" onClick={onToggleConfirmObjectionDialog} />}
            <MenuItem icon={<Delete />} label="削除する" onClick={onToggleDeleteExerciseDialog} />
            <MenuItem icon={<CloudDownload />} label="エクスポート" onClick={onToggleExportDialog} />
            <MenuItem icon={<Refresh />} label="再読み込み" onClick={onReloadExercise} />
          </Menu>
        ) : (
          <Menu>
            {!exerciseVote ? (
              <MenuItem icon={<HowToVote />} label="投票する" onClick={onToggleUploadVoteDialog} />
            ) : (
              <MenuItem icon={<HowToVote />} label="投票を取り消す" onClick={onToggleDeleteVoteDialog} />
            )}
            {<MenuItem icon={<WbIncandescent />} label="提案する" onClick={onToggleConfirmSuggestionDialog} />}
            {!isOwner && <MenuItem icon={<ReportProblem />} label="通報する" onClick={onToggleConfirmReportDialog} />}
            <MenuItem icon={<Refresh />} label="再読み込み" onClick={onReloadExercise} />
          </Menu>
        )
      }
    >
      <Property label="提出回数">
        <Link to={`/exercises/${exerciseSummary.exerciseId}/diary`} label={exerciseSummary.submitCount} />
      </Property>
      <Property label="評価">{exerciseSummary.upvoteCount - exerciseSummary.downvoteCount}</Property>
      <Property label="タグ">
        <Tags value={exerciseSummary.tags} />
      </Property>
      <Property label="作者">
        <Link to={`/users/${exerciseSummary.authorId}`} label={exerciseSummary.authorName || "名無しさん"} />
      </Property>
      <Property label="コメント">
        <Link to={`/exercises/${exerciseSummary.exerciseId}/comments`} label={commentCount} />
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
      {exerciseVote && (
        <DeleteExerciseVoteDialog
          exerciseVoteId={exerciseVote.id}
          isOpen={isDeleteVoteDialogOpen}
          onClose={onToggleDeleteVoteDialog}
        />
      )}
      <ConfirmSuggestionDialog
        exercise={exercise}
        isOpen={isConfirmSuggestionDialogOpen}
        onClose={onToggleConfirmSuggestionDialog}
      />
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
      <ExportExerciseDialog exercise={exercise} isOpen={isExportDialogOpen} onClose={onToggleExportDialog} />
    </Card>
  );
});
