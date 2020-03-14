import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { EntityId, Exercise, SubmissionSummary } from "../../../../shared/api/entities";
import { QuestionResult, summarizeResults } from "../../../domain/exercise/attempt";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useSearch } from "../../../hooks/useSearch";
import { actions } from "../../../reducers";
import { generateLocalEntityId } from "../../../reducers/entity";
import { AttemptManager } from "./AttemptManager";

export const SubmissionManager = React.memo<{
  exercise: Exercise;
  contestId?: EntityId<"Contest">;
  hasNext?: boolean;
  onNext?: () => void;
  onClose: () => void;
}>(({ exercise, contestId, hasNext, onNext, onClose }) => {
  const dispatch = useDispatch();
  const { currentUser } = useCurrentUser();

  const { entities: submissionSummaries } = useSearch("SubmissionSummary", {
    submitterId: currentUser.id,
    exerciseId: exercise.id
  });
  const submissionSummary = submissionSummaries[0];

  const [prevSubmissionSummary, setPrevSubmissionSummary] = useState<SubmissionSummary>();

  const onFinish = useCallback(
    (results: QuestionResult[]) => {
      setPrevSubmissionSummary(submissionSummary);

      const submissionId = generateLocalEntityId<"Submission">();

      dispatch(
        actions.buffers.update("Submission", submissionId, {
          exerciseId: exercise.id,
          contestId,
          ...summarizeResults(results)
        })
      );
      dispatch(
        actions.api.upload("Submission", submissionId, undefined, uploadResponse => {
          dispatch(
            actions.cache.add(
              "SubmissionSummary",
              {
                submitterId: currentUser.id,
                exerciseId: exercise.id
              },
              uploadResponse
            )
          );
        })
      );
    },
    [exercise, submissionSummary]
  );

  return (
    <AttemptManager
      exercise={exercise}
      submissionSummary={prevSubmissionSummary}
      hasNext={hasNext}
      onNext={onNext}
      onFinish={onFinish}
      onClose={onClose}
    />
  );
});
