import * as React from "react";
import { useEffect, useState } from "react";
import { CompiledQuestion, RomanChunk } from "../../../domain/content/compiler";
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

const REQUIRE_ENTER = false;

export const QuestionPlayer: React.FunctionComponent<{
  question: CompiledQuestion;
  onFinish: (result: QuestionResult) => void;
}> = ({ question, onFinish }) => {
  const [state, setState] = useState<QuestionPlayerState>({
    currentChunkIndex: 0,
    currentCharIndex: 0,
    typedLines: question.roman[0].length === 0 ? [""] : [],
    typedString: "",
    typoMap: {},
    hasTypo: false,
    totalTime: 0,
    isSuspended: true,
    startedAt: 0
  });

  const { totalTime, typoMap, typedLines, isSuspended, startedAt } = state;
  const isFinished = typedLines.length === question.roman.length;

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
      setState(previousState => getNextState(previousState, question, REQUIRE_ENTER, e));
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isFinished]);

  return (
    <Column flex={1}>
      <QuestionRenderer question={question} state={state} isFinished={isFinished} requireEnter={REQUIRE_ENTER} />
    </Column>
  );
};

const getNextState = (
  previousState: QuestionPlayerState,
  question: CompiledQuestion,
  requireEnter: boolean,
  e: KeyboardEvent
): QuestionPlayerState => {
  const { key } = e;
  const isEnter = key === "Enter";

  const isModifierKey = (isEnter && !requireEnter) || (!isEnter && key.length !== 1);
  if (isModifierKey) {
    return previousState;
  }

  const nextTimeState = {
    isSuspended: false,
    startedAt: previousState.isSuspended ? Date.now() : previousState.startedAt
  };

  const { currentChunkIndex, currentCharIndex, typedLines, typedString } = previousState;
  const romanLines = question.roman;

  const currentLineIndex = typedLines.length;
  const currentLine = romanLines[currentLineIndex];
  const currentChunk = currentLine[currentChunkIndex];

  const isWaitingEnter = currentChunk === undefined;
  if (isWaitingEnter) {
    if (isEnter) {
      return {
        ...previousState,
        ...nextTimeState,
        currentChunkIndex: 0,
        currentCharIndex: 0,
        typedLines: [...typedLines, typedString],
        typedString: ""
      };
    } else {
      return previousState;
    }
  } else if (isEnter) {
    return previousState;
  }

  const matchedCandidates = getMatchedCandidates(key, typedString, currentChunk, currentCharIndex);

  const isCurrentChunkFinished = matchedCandidates.some(candidate => candidate.length === currentCharIndex + 1);
  const isCurrentLineFinished = isCurrentChunkFinished && currentLine.length === currentChunkIndex + 1;

  const currentTypedString = `${typedString}${key}`;

  const shouldWaitEnter = isCurrentLineFinished && requireEnter;
  if (shouldWaitEnter) {
    return {
      ...previousState,
      ...nextTimeState,
      hasTypo: false,
      currentChunkIndex: currentChunkIndex + 1,
      typedString: currentTypedString
    };
  }

  const hasTypo = matchedCandidates.length === 0;
  if (hasTypo) {
    return {
      ...previousState,
      ...nextTimeState,
      hasTypo
    };
  }

  return {
    ...previousState,
    ...nextTimeState,
    hasTypo,
    currentChunkIndex: getNextChunkIndex(currentChunkIndex, {
      isCurrentLineFinished,
      isCurrentChunkFinished
    }),
    currentCharIndex: getNextCharIndex(currentCharIndex, {
      isCurrentChunkFinished
    }),
    typedLines: getNextTypedLines(typedLines, currentTypedString, romanLines, {
      isCurrentLineFinished
    }),
    typedString: getNextTypedString(currentTypedString, {
      isCurrentLineFinished
    })
  };
};

const getMatchedCandidates = (
  key: string,
  previousTypedString: string,
  currentChunk: RomanChunk,
  currentCharIndex: number
) => {
  const previousTypedCandidateString = currentCharIndex === 0 ? "" : previousTypedString.slice(currentCharIndex * -1);
  const currentTypedCandidateString = `${previousTypedCandidateString}${key}`;

  return currentChunk.candidates.filter(
    candidate => candidate.slice(0, currentCharIndex + 1) === currentTypedCandidateString
  );
};

const getNextChunkIndex = (
  currentChunkIndex: number,
  flags: {
    isCurrentLineFinished: boolean;
    isCurrentChunkFinished: boolean;
  }
) => {
  if (flags.isCurrentLineFinished) {
    return 0;
  }

  if (flags.isCurrentChunkFinished) {
    return currentChunkIndex + 1;
  }

  return currentChunkIndex;
};

const getNextCharIndex = (
  currentCharIndex: number,
  flags: {
    isCurrentChunkFinished: boolean;
  }
) => {
  if (flags.isCurrentChunkFinished) {
    return 0;
  } else {
    return currentCharIndex + 1;
  }
};

const getNextTypedLines = (
  previousTypedLines: string[],
  currentTypedString: string,
  romanLines: RomanChunk[][],
  flags: {
    isCurrentLineFinished: boolean;
  }
) => {
  if (!flags.isCurrentLineFinished) {
    return previousTypedLines;
  }

  const currentLineIndex = previousTypedLines.length;
  const nextRomanLine = romanLines[currentLineIndex + 1];
  const isNextLineEmpty = nextRomanLine !== undefined && nextRomanLine.length === 0;

  if (!isNextLineEmpty) {
    return [...previousTypedLines, currentTypedString];
  }

  return [...previousTypedLines, currentTypedString, ""];
};

const getNextTypedString = (
  currentTypedString: string,
  flags: {
    isCurrentLineFinished: boolean;
  }
) => {
  if (flags.isCurrentLineFinished) {
    return "";
  } else {
    return currentTypedString;
  }
};
