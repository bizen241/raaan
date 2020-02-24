import { useCallback } from "react";
import { ExerciseSummary } from "../../shared/api/entities";
import { useBuffers } from "./useBuffers";
import { useCurrentUser } from "./useCurrentUser";
import { useEntity } from "./useEntity";
import { useSearch } from "./useSearch";

export const useExerciseActions = (exerciseSummary: ExerciseSummary) => {
  const { currentUserId, currentUser } = useCurrentUser();
  const { exerciseId, authorId } = exerciseSummary;

  const isGuest = currentUser.permission === "Guest";
  const isAuthor = authorId === currentUserId;

  const { entities: exerciseVotes, status: exerciseVotesStatus, onReload: onReloadExerciseVotes } = useSearch(
    "ExerciseVote",
    {
      voterId: currentUserId,
      targetId: exerciseId
    },
    !isGuest && !isAuthor
  );
  const {
    entities: suggestionSummaries,
    status: suggestionSummariesStatus,
    onReload: onReloadSuggestionSummaries
  } = useSearch(
    "SuggestionSummary",
    {
      authorId: currentUserId,
      exerciseId,
      state: "pending"
    },
    !isGuest && !isAuthor
  );
  const { entities: reportSummaries, status: reportSummariesStatus, onReload: onReloadReportSummaries } = useSearch(
    "ReportSummary",
    {
      reporterId: currentUserId,
      targetType: "Exercise",
      targetId: exerciseId
    },
    !isGuest && !isAuthor
  );
  const {
    entities: objectionSummaries,
    status: objectionSummariesStatus,
    onReload: onReloadObjectionSummariess
  } = useSearch(
    "ObjectionSummary",
    {
      objectorId: currentUserId,
      targetId: exerciseId
    },
    exerciseSummary.isLocked
  );

  const exerciseVote = exerciseVotes[0];
  const suggestionSummary = suggestionSummaries[0];
  const reportSummary = reportSummaries[0];
  const objectionSummary = objectionSummaries[0];

  const { bufferIds: suggestionBufferIds, bufferMap: suggestionBufferMap } = useBuffers("Suggestion");
  const { bufferIds: reportBufferIds, bufferMap: reportBufferMap } = useBuffers("Report");
  const { bufferIds: objectionBufferIds, bufferMap: objectionBufferMap } = useBuffers("Objection");

  const suggestionBufferId = suggestionBufferIds.find(bufferId => {
    const buffer = suggestionBufferMap[bufferId];

    return buffer && buffer.exerciseId === exerciseId;
  });
  const reportBufferId = reportBufferIds.find(bufferId => {
    const buffer = reportBufferMap[bufferId];

    return buffer && buffer.targetType === "Exercise" && buffer.targetId === exerciseId;
  });
  const objectionBufferId = objectionBufferIds.find(bufferId => {
    const buffer = objectionBufferMap[bufferId];

    return buffer && buffer.targetType === "Exercise" && buffer.targetId === exerciseId;
  });

  const { onReload: onReloadExercise } = useEntity("Exercise", exerciseId);

  const onReload = useCallback(() => {
    onReloadExercise();
    onReloadExerciseVotes();
    onReloadSuggestionSummaries();
    onReloadReportSummaries();
    onReloadObjectionSummariess();
  }, []);

  return {
    isFetched:
      exerciseVotesStatus === 200 &&
      suggestionSummariesStatus === 200 &&
      reportSummariesStatus === 200 &&
      objectionSummariesStatus === 200,
    exerciseVoteId: exerciseVote && exerciseVote.id,
    suggestionId: suggestionSummary ? suggestionSummary.suggestionId : suggestionBufferId,
    reportId: reportSummary ? reportSummary.parentId : reportBufferId,
    objectionId: objectionSummary ? objectionSummary.parentId : objectionBufferId,
    onReload
  };
};
