import { CircularProgress } from "@material-ui/core";
import * as React from "react";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Exercise, Submission, SubmissionSummary } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";
import { QuestionResult, summarizeResults } from "../../domain/exercise/attempt";
import { useEntity } from "../../hooks/entity";
import { useSearch } from "../../hooks/search";
import { actions, RootState } from "../../reducers";
import { UserContext } from "../project/Context";
import { AttemptManager } from "./AttemptManager";
import { AttemptMessage } from "./AttemptMessage";

export const ExercisePlayer = React.memo<{
  exerciseId: string;
  isOpen: boolean;
  onClose: () => void;
}>(({ exerciseId, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const currentUser = useContext(UserContext);

  const [submissionSummary, setSubmissionSummary] = useState<SubmissionSummary | undefined>();

  const submissionId = useMemo(() => Date.now().toString(), []);

  const { entities: submissionSummaries, onReload: onReloadSubmissionSummaries } = useSearch<SubmissionSummary>(
    "SubmissionSummary",
    {
      submitterId: currentUser.id,
      exerciseId,
      limit: 1,
      offset: 0
    }
  );

  const { entity: exercise } = useEntity<Exercise>("Exercise", exerciseId);
  const submissionStatus = useSelector((state: RootState) => state.api.upload.Submission[submissionId]);

  const onFinish = useCallback(
    (results: QuestionResult[]) => {
      setSubmissionSummary(submissionSummaries[0]);

      const submission: SaveParams<Submission> = {
        exerciseId,
        ...summarizeResults(results)
      };

      dispatch(actions.buffers.add("Submission", submissionId));
      dispatch(actions.buffers.update("Submission", submissionId, submission));
      dispatch(actions.api.upload("Submission", submissionId));
    },
    [submissionSummaries]
  );

  useEffect(() => {
    if (submissionStatus === 200 && submissionSummaries.length === 0) {
      onReloadSubmissionSummaries();
    }
  }, [submissionStatus]);

  if (exercise === undefined) {
    return <AttemptMessage icon={<CircularProgress />} title="ロード中です" onClose={onClose} />;
  }

  return (
    <AttemptManager
      exercise={exercise}
      submissionSummary={submissionSummary}
      onFinish={onFinish}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
});
