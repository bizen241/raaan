import { useCallback } from "react";
import { useSelector } from "react-redux";
import { ExerciseSummary } from "../../shared/api/entities";
import { RootState } from "../reducers";
import { useCurrentUser } from "./useCurrentUser";
import { useEntity } from "./useEntity";
import { useSearch } from "./useSearch";

export const useExerciseActions = (exerciseSummary: ExerciseSummary) => {
  const { currentUserId, currentUser } = useCurrentUser();
  const { exerciseId, authorId } = exerciseSummary;

  const isGuest = currentUser.permission === "Guest";
  const isAuthor = authorId === currentUserId;

  const { entityIds: voteIds, status: voteStatus, onReload: onReloadExerciseVotes } = useSearch(
    "ExerciseVote",
    {
      voterId: currentUserId,
      targetId: exerciseId
    },
    !isGuest && !isAuthor
  );
  const { entityIds: suggestionIds, status: suggestionStatus, onReload: onReloadSuggestionSummaries } = useSearch(
    "SuggestionSummary",
    {
      authorId: currentUserId,
      exerciseId,
      state: "pending"
    },
    !isGuest && !isAuthor
  );
  const { entityIds: reportIds, status: reportStatus, onReload: onReloadReports } = useSearch(
    "ReportSummary",
    {
      reporterId: currentUserId,
      targetType: "Exercise",
      targetId: exerciseId
    },
    !isGuest && !isAuthor
  );
  const { entityIds: objectionIds, status: objectionStatus, onReload: onReloadObjections } = useSearch(
    "Objection",
    {
      objectorId: currentUserId,
      targetId: exerciseId
    },
    exerciseSummary.isLocked
  );

  const suggestionBuffers = useSelector((state: RootState) => state.buffers.Suggestion);
  const objectionBuffers = useSelector((state: RootState) => state.buffers.Objection);
  const reportBuffers = useSelector((state: RootState) => state.buffers.Report);

  const voteId = voteIds[0];
  const suggestionId =
    suggestionIds[0] ||
    Object.keys(suggestionBuffers).find(bufferId => {
      const buffer = suggestionBuffers[bufferId];

      return buffer !== undefined && buffer.exerciseId === exerciseId;
    });
  const reportId =
    reportIds[0] ||
    Object.keys(reportBuffers).find(bufferId => {
      const buffer = reportBuffers[bufferId];

      return buffer !== undefined && buffer.targetId === exerciseId;
    });
  const objectionId =
    objectionIds[0] ||
    Object.keys(objectionBuffers).find(bufferId => {
      const buffer = objectionBuffers[bufferId];

      return buffer !== undefined && buffer.targetId === exerciseId;
    });

  const { onReload: onReloadExercise } = useEntity("Exercise", exerciseId);

  const onReload = useCallback(() => {
    onReloadExercise();
    onReloadExerciseVotes();
    onReloadSuggestionSummaries();
    onReloadReports();
    onReloadObjections();
  }, []);

  return {
    isFetched: voteStatus === 200 && suggestionStatus === 200 && reportStatus === 200 && objectionStatus === 200,
    voteId,
    suggestionId,
    reportId,
    objectionId,
    onReload
  };
};
