import { Card, CardHeader, CircularProgress } from "@material-ui/core";
import { Error } from "@material-ui/icons";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPlan } from "../../../domain/content";
import { CompiledQuestion, compileQuestions } from "../../../domain/content/compiler";
import { RootState } from "../../../reducers";
import { apiActions } from "../../../reducers/api";
import { AttemptResult } from "../renderers/AttemptResult";
import { QuestionPlayer } from "./QuestionPlayer";

export interface Attempt {
  questions: CompiledQuestion[];
  plan: number[];
}

export interface QuestionResult {
  totalTime: number;
  typoMap: any;
  typedLines: string[][];
}

export const ExercisePlayer = React.memo<{
  exerciseId: string;
  questionIndices?: number[];
  isPreview?: boolean;
  onClose: () => void;
}>(({ exerciseId, isPreview = false }) => {
  const dispatch = useDispatch();
  const exercise = useSelector((state: RootState) => {
    if (isPreview) {
      const buffer = state.buffers.Exercise[exerciseId];

      return buffer && buffer.edited;
    } else {
      return state.cache.get.Exercise[exerciseId];
    }
  });

  React.useEffect(() => {
    if (exercise === undefined && !isPreview) {
      dispatch(apiActions.get("Exercise", exerciseId));
    }
  }, []);

  const [attempt, setAttempt] = React.useState<Attempt>();
  const [results, updateResults] = React.useState<QuestionResult[]>([]);

  React.useEffect(() => {
    if (exercise !== undefined) {
      const selectedQuestions = exercise.questions || [];

      setAttempt({
        questions: compileQuestions(exercise),
        plan: createPlan(selectedQuestions)
      });
    }
  }, [exercise]);

  const onNext = React.useCallback((result: QuestionResult) => updateResults(s => [...s, result]), []);

  if (exercise === undefined && isPreview) {
    return (
      <Card>
        <CardHeader avatar={<Error />} title="バッファが見つかりませんでした" />
      </Card>
    );
  }

  if (exercise === undefined || attempt === undefined) {
    return (
      <Card>
        <CardHeader avatar={<CircularProgress />} title="ロード中です" />
      </Card>
    );
  }

  const { questions, plan } = attempt;

  if (questions.length === 0) {
    return (
      <Card>
        <CardHeader avatar={<Error />} title="空の問題集です" />
      </Card>
    );
  }

  const resultCount = results.length;
  const isFinished = resultCount === plan.length;

  if (isFinished) {
    return <AttemptResult attempt={attempt} results={results} />;
  }

  const currentQuestionIndex = plan[resultCount];
  const currentQuestion = questions[currentQuestionIndex];

  return <QuestionPlayer key={resultCount} question={currentQuestion} onFinish={onNext} />;
});
