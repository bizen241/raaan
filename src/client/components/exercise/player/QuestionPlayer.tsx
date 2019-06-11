import * as React from "react";
import { useEffect, useState } from "react";
import { QuestionResult } from "../../../domain/attempt";
import { CompiledQuestion } from "../../../domain/exercise/compiler";
import { QuestionRenderer } from "../renderers/QuestionRenderer";

export interface QuestionPlayerState {
  typedLines: string[][];
  typoMap: any;
  hasTypo: boolean;
  totalTime: number;
  startedAt: number;
  isSuspended: boolean;
  isFinished: boolean;
}

export const QuestionPlayer: React.FunctionComponent<{
  question: CompiledQuestion;
  onFinish: (result: QuestionResult) => void;
}> = ({ question, onFinish }) => {
  const isEmptyQuestion = question.roman[0].length === 0;

  const [state, setState] = useState<QuestionPlayerState>({
    typedLines: [[""]],
    typoMap: {},
    hasTypo: false,
    totalTime: 0,
    startedAt: 0,
    isSuspended: true,
    isFinished: false
  });

  const { typedLines, typoMap, totalTime, startedAt, isSuspended, isFinished } = state;

  useEffect(() => {
    if (!isSuspended) {
      const suspend = () => {
        setState({
          ...state,
          isSuspended: true,
          totalTime: totalTime + (Date.now() - startedAt)
        });
      };

      const timeoutId = setTimeout(suspend, 3000);
      return clearTimeout(timeoutId);
    }
  }, [state]);
  useEffect(() => {
    if (isFinished) {
      onFinish({
        totalTime: startedAt === 0 ? 0 : totalTime + (Date.now() - startedAt),
        typoMap,
        typedLines
      });

      return;
    }

    const onKeyDown = (e: KeyboardEvent) => {
      setState(previousState => getNextState(previousState, question, e));
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isFinished]);

  if (isEmptyQuestion) {
    return null;
  }

  return <QuestionRenderer question={question} state={state} />;
};

const getNextState = (
  previousState: QuestionPlayerState,
  question: CompiledQuestion,
  e: KeyboardEvent
): QuestionPlayerState => {
  const { typedLines, startedAt, isSuspended } = previousState;
  const { roman: romanLines } = question;
  const { key } = e;

  if (key === "Crtl" || key === "Shift" || key === "Alt") {
    return previousState;
  }

  const nextTimeState = {
    startedAt: isSuspended ? Date.now() : startedAt,
    isSuspended: false
  };

  const currentLineIndex = typedLines.length - 1;
  const currentChunkIndex = typedLines[currentLineIndex].length - 1;

  const currentLine = romanLines[currentLineIndex];
  const currentChunk = currentLine[currentChunkIndex];

  const typedLine = typedLines[currentLineIndex];
  const typedChunk = typedLine[currentChunkIndex];

  const currentCharIndex = typedChunk.length;

  const isWaitingEnter =
    typedLine.length === currentLine.length && currentChunk.candidates.some(candidate => candidate === typedChunk);

  if (isWaitingEnter) {
    if (key === "Enter") {
      return {
        ...previousState,
        ...nextTimeState,
        typedLines: [...typedLines, [""]]
      };
    } else {
      return {
        ...previousState,
        ...nextTimeState
      };
    }
  }

  const nextTypedChunk = `${typedChunk}${key}`;
  const nextCandidates = currentChunk.candidates.filter(
    candidate => candidate.slice(0, currentCharIndex + 1) === nextTypedChunk
  );

  if (nextCandidates.length === 0) {
    return {
      ...previousState,
      ...nextTimeState,
      hasTypo: true
    };
  }

  const isCurrentChunkFinished = nextCandidates.some(candidate => candidate.length === nextTypedChunk.length);
  const isCurrentLineFinished = isCurrentChunkFinished && currentLine.length === currentChunkIndex + 1;
  const isCurrentQuestionFinished = isCurrentLineFinished && romanLines.length === currentLineIndex + 1;

  const nextTypedLine =
    isCurrentChunkFinished && !isCurrentLineFinished
      ? [...typedLine.slice(0, currentChunkIndex), nextTypedChunk, ""]
      : [...typedLine.slice(0, currentChunkIndex), nextTypedChunk];
  const nextTypedLines = [...typedLines.slice(0, currentLineIndex), nextTypedLine];

  return {
    ...previousState,
    ...nextTimeState,
    typedLines: nextTypedLines,
    hasTypo: false,
    isFinished: isCurrentQuestionFinished
  };
};
