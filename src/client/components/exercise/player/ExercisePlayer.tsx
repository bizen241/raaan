import { Card, CardHeader, CircularProgress } from "@material-ui/core";
import { Error } from "@material-ui/icons";
import * as React from "react";
import { Exercise } from "../../../../shared/api/entities";
import { SaveParams } from "../../../../shared/api/request/save";
import { CompiledQuestion, compileQuestions } from "../../../domain/content/compiler";
import { connector } from "../../../reducers";
import { attemptsActions, QuestionResult } from "../../../reducers/attempts";
import { Column } from "../../ui";
import { AttemptResult } from "../renderers/AttemptResult";
import { QuestionPlayer } from "./QuestionPlayer";

export const ExercisePlayer = connector(
  (state, ownProps: { id: string; params: SaveParams<Exercise> }) => ({
    ...ownProps,
    attempt: state.attempts
  }),
  () => ({
    ...attemptsActions
  }),
  ({ id, params, attempt, load, next }) => {
    const [questions, setQuestions] = React.useState<CompiledQuestion[] | undefined>();

    React.useEffect(() => {
      if (id !== attempt.id) {
        load(id, params);
      }
    }, []);
    React.useEffect(() => {
      if (id === attempt.id && attempt.params !== undefined) {
        setQuestions(compileQuestions(attempt.params));
      }
    }, [attempt]);

    const onFinish = React.useCallback((result: QuestionResult) => next(result), []);

    if (attempt.id !== id || attempt.params === undefined || questions === undefined) {
      return (
        <Card>
          <CardHeader avatar={<CircularProgress />} title="ロード中です" />
        </Card>
      );
    }
    if (questions.length === 0) {
      return (
        <Card>
          <CardHeader avatar={<Error />} title="空の問題集です" />
        </Card>
      );
    }

    const { results, plan } = attempt;
    const resultCount = results.length;

    if (resultCount === plan.length) {
      return <AttemptResult attempt={attempt} />;
    }

    const currentQuestion = questions[plan[resultCount]];

    return (
      <Column style={{ height: "100%" }}>
        <QuestionPlayer key={resultCount} question={currentQuestion} onFinish={onFinish} />
      </Column>
    );
  }
);
