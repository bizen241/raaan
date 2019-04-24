import * as React from "react";
import { useEffect, useState } from "react";
import { CompiledQuestion } from "../../../domain/content/compiler";
import { QuestionResult, TypoMap } from "../../../reducers/attempts";
import { Column } from "../../ui";
import { QuestionRenderer } from "../renderers/QuestionRenderer";

export interface QuestionPlayerState {
  currentChunkIndex: number;
  currentCharIndex: number;
  typedLines: string[];
  typedString: string;
  typoMap: TypoMap;
  hasTypo: boolean;
  totalTime: number;
  isSuspended: boolean;
  startedAt: number;
}

export const QuestionPlayer: React.FunctionComponent<{
  question: CompiledQuestion;
  onFinish: (result: QuestionResult) => void;
}> = ({ question, onFinish }) => {
  const [state, setState] = useState<QuestionPlayerState>({
    currentChunkIndex: 0,
    currentCharIndex: 0,
    typedLines: [],
    typedString: "",
    typoMap: {},
    hasTypo: false,
    totalTime: 0,
    isSuspended: true,
    startedAt: 0
  });

  const { totalTime, typoMap, typedLines, startedAt } = state;
  const isFinished = typedLines.length === question.roman.length;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      setState(previousState => getNextState(previousState, question, e));
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });
  useEffect(() => {
    const suspend = () => {
      setState({
        ...state,
        isSuspended: true,
        totalTime: totalTime + (Date.now() - startedAt)
      });
    };

    const timeoutId = setTimeout(suspend, 3000);
    return clearTimeout(timeoutId);
  }, [state]);
  useEffect(() => {
    if (isFinished) {
      onFinish({
        totalTime,
        typoMap,
        typedLines
      });
    }
  }, [isFinished]);

  return (
    <Column flex={1}>
      <QuestionRenderer question={question} state={state} />
    </Column>
  );
};

const getNextState = (
  previousState: QuestionPlayerState,
  question: CompiledQuestion,
  e: KeyboardEvent
): QuestionPlayerState => {
  const { key } = e;

  const isSuspended = false;

  const { currentChunkIndex, currentCharIndex, typedLines, typedString } = previousState;
  const currentLineIndex = typedLines.length + 1;
  const currentLine = question.roman[currentLineIndex];

  const matchedCandidates = currentLine[currentChunkIndex].candidates.filter(
    candidate => candidate[currentCharIndex] === key
  );

  const hasTypo = matchedCandidates.length === 0;
  if (hasTypo) {
    return {
      ...previousState,
      hasTypo,
      isSuspended
    };
  }

  const isCurrentChunkFinished = matchedCandidates.some(candidate => candidate.length === currentCharIndex + 1);
  const isCurrentLineFinished = isCurrentChunkFinished && currentLine.length === currentChunkIndex + 1;

  const nextChunkIndex = isCurrentLineFinished ? 0 : currentChunkIndex + 1;
  const nextCharIndex = isCurrentChunkFinished ? 0 : currentCharIndex + 1;

  const nextTypedString = isCurrentChunkFinished ? "" : `${typedString}${key}`;
  const nextTypedLines = isCurrentLineFinished ? [...typedLines, `${typedString}${key}`] : typedLines;

  const startedAt = previousState.isSuspended ? previousState.startedAt : Date.now();

  return {
    ...previousState,
    currentChunkIndex: nextChunkIndex,
    currentCharIndex: nextCharIndex,
    typedLines: nextTypedLines,
    typedString: nextTypedString,
    hasTypo,
    isSuspended,
    startedAt
  };
};
