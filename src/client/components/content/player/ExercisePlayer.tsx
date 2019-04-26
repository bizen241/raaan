import { Callout } from "@blueprintjs/core";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { ExerciseDetail } from "../../../../shared/api/entities";
import { SaveParams } from "../../../../shared/api/request/save";
import { CompiledQuestion, compileQuestions } from "../../../domain/content/compiler";
import { connector } from "../../../reducers";
import { attemptsActions, QuestionResult } from "../../../reducers/attempts";
import { Column } from "../../ui";
import { AttemptResult } from "../renderers/AttemptResult";
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
      if (id !== attempt.id) {
        load(id, params);
      }
    }, []);
    useEffect(() => {
      if (id !== attempt.id && attempt.params !== undefined) {
        setQuestions(compileQuestions(attempt.params));
      }
    }, [attempt.params]);

    const onFinish = useCallback((result: QuestionResult) => next(result), []);

    if (attempt.id !== id || attempt.params === undefined || questions === undefined) {
      return (
        <Column>
          <Callout>ロード中...</Callout>
        </Column>
      );
    }
    if (questions.length === 0) {
      return (
        <Column>
          <Callout>空の問題集です</Callout>
        </Column>
      );
    }

    const { results, plan } = attempt;
    const resultCount = results.length;

    if (resultCount === plan.length) {
      return (
        <Column flex={1} center="both">
          <AttemptResult attempt={attempt} />
        </Column>
      );
    }

    const currentQuestion = questions[plan[resultCount]];

    return (
      <Column padding flex={1}>
        <QuestionPlayer key={resultCount} question={currentQuestion} onFinish={onFinish} />
      </Column>
    );
  }
);
