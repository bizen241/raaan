import { CircularProgress } from "@material-ui/core";
import * as React from "react";
import { useCallback, useContext, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Exercise, Submission, SubmissionSummary } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";
import { SearchParams } from "../../../shared/api/request/search";
import { stringifySearchParams } from "../../api/request/search";
import { getTotalTime, QuestionResult } from "../../domain/attempt";
import { useEntity } from "../../hooks/search";
import { actions, RootState } from "../../reducers";
import { UserContext } from "../project/Context";
import { AttemptManager } from "./AttemptManager";
import { AttemptMessage } from "./AttemptMessage";

export const ExercisePlayer = React.memo<{
  exerciseId: string;
  questionIndex?: number;
  onClose: () => void;
}>(({ exerciseId, questionIndex, onClose }) => {
  const dispatch = useDispatch();
  const currentUser = useContext(UserContext);

  const submissionId = useMemo(() => Date.now().toString(), []);

  const searchParams: SearchParams<SubmissionSummary> = {
    userId: currentUser.id,
    exerciseId,
    limit: 1,
    offset: 0
  };
  const searchQuery = stringifySearchParams(searchParams, true);

  const { entity: exercise } = useEntity<Exercise>("Exercise", exerciseId);
  const { submissionStatus, submissionSummaries } = useSelector((state: RootState) => ({
    submissionStatus: state.api.upload.Submission[submissionId],
    submissionSummaries: state.cache.search.SubmissionSummary[searchQuery]
  }));

  const onFinish = useCallback((results: QuestionResult[]) => {
    if (questionIndex === undefined) {
      const submission: SaveParams<Submission> = {
        exerciseId,
        time: getTotalTime(results),
        accuracy: 100
      };

      dispatch(actions.buffers.add("Submission", submissionId, submission));
      dispatch(actions.api.upload("Submission", submissionId));
    }
  }, []);

  useEffect(() => {
    if (submissionStatus === 200 && (submissionSummaries === undefined || submissionSummaries.count === 0)) {
      dispatch(actions.api.search("SubmissionSummary", searchParams));
    }
  }, [submissionStatus]);

  if (exercise === undefined) {
    return <AttemptMessage icon={<CircularProgress />} title="ロード中です" onClose={onClose} />;
  }

  return <AttemptManager exercise={exercise} onFinish={onFinish} onClose={onClose} />;
});
