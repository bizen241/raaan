import { useCallback, useContext, useMemo, useState } from "react";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Exercise, Submission, SubmissionSummary } from "../../../../shared/api/entities";
import { EntityMap } from "../../../../shared/api/response/get";
import { QuestionResult, summarizeResults } from "../../../domain/exercise/attempt";
import { withEntity } from "../../../enhancers/withEntity";
import { actions, RootState } from "../../../reducers";
import { UserContext } from "../../project/Context";
import { AttemptManager } from "./AttemptManager";

interface Props {
  hasNext?: boolean;
  onNext?: () => void;
  onClose: () => void;
}

export const SubmissionManager = withEntity<Exercise, Props>({ entityType: "Exercise" })(
  React.memo(({ entityId: exerciseId, entity: exercise, hasNext, onNext, onClose }) => {
    const dispatch = useDispatch();
    const currentUser = useContext(UserContext);

    const submissionSummary = useSubmissionSummary(currentUser.id, exerciseId);
    const [prevSubmissionSummary, setPrevSubmissionSummary] = useState<SubmissionSummary>();

    const onFinish = useCallback(
      (results: QuestionResult[]) => {
        setPrevSubmissionSummary(submissionSummary);

        const submissionId = Date.now().toString();

        dispatch(
          actions.buffers.update<Submission>("Submission", submissionId, {
            exerciseId,
            ...summarizeResults(results)
          })
        );
        dispatch(actions.api.upload("Submission", submissionId));
      },
      [exerciseId, submissionSummary]
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
  })
);

const useSubmissionSummary = (submitterId: string, exerciseId: string) => {
  const submissionSummaries = useSelector((state: RootState) => state.cache.get.SubmissionSummary);
  const submissionSummary = useMemo(() => findSubmissionSummary(submissionSummaries, submitterId, exerciseId), [
    exerciseId,
    submissionSummaries
  ]);

  return submissionSummary;
};

const findSubmissionSummary = (
  submissionSummaries: EntityMap<SubmissionSummary>,
  submitterId: string,
  exerciseId: string
) =>
  Object.values(submissionSummaries).find(
    submissionSummary =>
      submissionSummary !== undefined &&
      submissionSummary.submitterId === submitterId &&
      submissionSummary.exerciseId === exerciseId
  );
