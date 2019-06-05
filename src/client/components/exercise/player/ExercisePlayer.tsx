import { AppBar, Card, CardHeader, CircularProgress, DialogContent, IconButton, Toolbar } from "@material-ui/core";
import { Close, Error } from "@material-ui/icons";
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
  questionIndex?: number;
  isPreview?: boolean;
  onClose: () => void;
}>(({ exerciseId, questionIndex, isPreview = false, onClose }) => {
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
      const sourceQuestions = exercise.questions || [];
      const selectedQuestions = questionIndex !== undefined ? [sourceQuestions[questionIndex]] : sourceQuestions;

      setAttempt({
        questions: compileQuestions(selectedQuestions),
        plan: createPlan(selectedQuestions)
      });
    }
  }, [exercise]);

  const onNext = React.useCallback((result: QuestionResult) => updateResults(s => [...s, result]), []);

  if (exercise === undefined && isPreview) {
    return (
      <MessageContainer onClose={onClose}>
        <CardHeader avatar={<Error />} title="バッファが見つかりませんでした" />
      </MessageContainer>
    );
  }

  if (exercise === undefined || attempt === undefined) {
    return (
      <MessageContainer onClose={onClose}>
        <CardHeader avatar={<CircularProgress />} title="ロード中です" />
      </MessageContainer>
    );
  }

  const { questions, plan } = attempt;

  if (questions.length === 0) {
    return (
      <MessageContainer onClose={onClose}>
        <CardHeader avatar={<Error />} title="空の問題集です" />
      </MessageContainer>
    );
  }

  const resultCount = results.length;
  const isFinished = resultCount === plan.length;

  if (isFinished) {
    return (
      <>
        <AppBar position="relative">
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" onClick={onClose}>
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <AttemptResult attempt={attempt} results={results} />
        </DialogContent>
      </>
    );
  }

  const currentQuestionIndex = plan[resultCount];
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <AppBar position="relative">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" onClick={onClose}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <QuestionPlayer key={resultCount} question={currentQuestion} onFinish={onNext} />
      </DialogContent>
    </>
  );
});

const MessageContainer = React.memo<{ onClose: () => void; children: React.ReactNode }>(({ onClose, children }) => (
  <>
    <AppBar position="relative">
      <Toolbar variant="dense">
        <IconButton edge="start" color="inherit" onClick={onClose}>
          <Close />
        </IconButton>
      </Toolbar>
    </AppBar>
    <DialogContent>
      <Card>{children}</Card>
    </DialogContent>
  </>
));
