import { Callout } from "@blueprintjs/core";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { ExerciseDetail } from "../../../../shared/api/entities";
import { SaveParams } from "../../../../shared/api/request/save";
import { CompiledQuestion, compileQuestions } from "../../../domain/content/compiler";
import { connector } from "../../../reducers";
import { attemptsActions, QuestionResult } from "../../../reducers/attempts";
import { Column } from "../../ui";
import { AttemptResult } from "./AttemptResult";
import { QuestionPlayer } from "./QuestionPlayer";

export const ExercisePlayer = connector(
  (state, ownProps: { id: string; params: SaveParams<ExerciseDetail> }) => ({
    ...ownProps,
    attempt: state.attempts
  }),
  () => ({
    ...attemptsActions
  }),
  ({ id, params, attempt, load, next }) => {
    const [questions, setQuestions] = useState<CompiledQuestion[] | undefined>();

    useEffect(() => {
      load(id, params);
    }, []);
    useEffect(() => {
      setQuestions(compileQuestions(params));
    });

    if (attempt.id !== id || attempt.params === undefined || questions === undefined) {
      return (
        <Column>
          <Callout>Loading...</Callout>
        </Column>
      );
    }

    const { results, plan } = attempt;
    const cursor = results.length;

    if (questions.length === 0) {
      return <div>Empty</div>;
    }
    if (cursor === plan.length) {
      return (
        <Column flex={1} center="both">
          <AttemptResult attempt={attempt} />
        </Column>
      );
    }

    const currentQuestion = questions[plan[cursor]];

    return (
      <Column padding flex={1}>
        <QuestionPlayer
          key={cursor}
          question={currentQuestion}
          onFinish={useCallback((result: QuestionResult) => next(result), [])}
        />
      </Column>
    );
  }
);
