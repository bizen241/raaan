import { CircularProgress } from "@material-ui/core";
import * as React from "react";
import { useCallback, useContext, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Exercise, Submission, SubmissionSummary } from "../../../shared/api/entities";
import { EntityMap } from "../../../shared/api/response/get";
import { QuestionResult, summarizeResults } from "../../domain/exercise/attempt";
import { useEntity } from "../../hooks/entity";
import { actions, RootState } from "../../reducers";
import { DialogProps } from "../dialogs";
import { UserContext } from "../project/Context";
import { AttemptManager } from "./AttemptManager";
import { AttemptMessage } from "./AttemptMessage";

export const ExercisePlayer = React.memo<
  {
    exerciseId: string;
    onNext?: () => void;
  } & DialogProps
>(({ exerciseId, onNext, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const currentUser = useContext(UserContext);

  const { entity: exercise } = useEntity<Exercise>("Exercise", exerciseId);
  const submissionSummary = useSubmissionSummary(currentUser.id, exerciseId);

  const onFinish = useCallback((results: QuestionResult[]) => {
    const submissionId = Date.now().toString();

    dispatch(
      actions.buffers.add<Submission>("Submission", submissionId, {
        exerciseId,
        ...summarizeResults(results)
      })
    );
    dispatch(actions.api.upload("Submission", submissionId));
  }, []);

  if (exercise === undefined) {
    return <AttemptMessage icon={<CircularProgress />} title="ロード中です" onClose={onClose} />;
  }

  return (
    <AttemptManager
      exercise={exercise}
      submissionSummary={submissionSummary}
      onNext={onNext}
      onFinish={onFinish}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
});

const useSubmissionSummary = (submitterId: string, exerciseId: string) => {
  const submissionSummaries = useSelector((state: RootState) => state.cache.get.SubmissionSummary);
  const submissionSummary = useMemo(() => findSubmissionSummary(submissionSummaries, submitterId, exerciseId), [
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
      submissionSummary && submissionSummary.submitterId === submitterId && submissionSummary.exerciseId === exerciseId
  );
