import * as React from "react";
import { useEffect, useState } from "react";
import { ExerciseItem } from "../../../../shared/content";
import { CompiledChar, CompiledItem, CompiledLine } from "../../../domain/content/compiler";
import { ExerciseItemResult, TypoMap } from "../../../reducers/player";
import { Column } from "../../ui";
import { contentItemTypeToRenderer } from "./items";

interface ExerciseItemPlayerState {
  untypedLines: CompiledItem;
  untypedChars: CompiledLine;
  untypedCharStrings: string[];
  currentLine: CompiledLine;
  currentChar: CompiledChar;
  typedLines: string[];
  typedString: string;
  typedSource: string;
  hasTypo: boolean;
  typoMap: TypoMap;
  startedAt: number;
  isSuspended: boolean;
  totalTime: number;
  isCurrentItemFinished: boolean;
  isCurrentLineFinished: boolean;
}

export const ExerciseItemPlayer: React.FunctionComponent<{
  item: ExerciseItem;
  compiledItem: CompiledItem;
  onFinish: (result: ExerciseItemResult) => void;
}> = ({ item, compiledItem, onFinish }) => {
  const [state, setState] = useState<ExerciseItemPlayerState>(() => getInitialState(compiledItem));

  const { isCurrentItemFinished, isCurrentLineFinished } = state;

  useEffect(
    () => {
      if (isCurrentItemFinished) {
        onFinish({
          id: item.id,
          time: state.totalTime,
          typeCount: state.typedLines
            .map(line => line.length)
            .reduce((totalLength, lineLength) => totalLength + lineLength, 0),
          typoMap: state.typoMap
        });

        return;
      }

      const onKeyDown = (e: KeyboardEvent) => {
        setState(previousState => getNextState(previousState, e));
      };

      document.addEventListener("keydown", onKeyDown);
      return () => document.removeEventListener("keydown", onKeyDown);
    },
    [isCurrentItemFinished]
  );
  useEffect(() => {
    const suspend = () => {
      setState({
        ...state,
        isSuspended: true,
        totalTime: state.totalTime + (Date.now() - state.startedAt)
      });
    };

    const timeoutId = setTimeout(suspend, 3000);
    return clearTimeout(timeoutId);
  });

  const untypedString = state.untypedChars.map(char => char.compiled[0]).join("");
  const untypedSource = state.untypedChars.map(char => char.source).join("");

  const Renderer = contentItemTypeToRenderer[item.type];

  return (
    <Column flex={1}>
      <Renderer
        item={item}
        untypedSource={`${isCurrentLineFinished ? "" : state.currentChar.source}${untypedSource}`}
        untypedString={`${state.untypedCharStrings[0]}${untypedString}`}
        typedLines={state.typedLines}
        typedString={state.typedString}
        typedSource={state.typedSource}
        hasTypo={state.hasTypo}
      />
    </Column>
  );
};

const getInitialState = (compiledItem: CompiledItem): ExerciseItemPlayerState => {
  const currentLine = compiledItem[0] || [];
  const currentChar = currentLine[0];

  return {
    untypedLines: compiledItem.slice(1),
    untypedChars: currentLine.slice(1),
    untypedCharStrings: [...(currentLine.length !== 0 ? currentChar.compiled : [])],
    currentLine,
    currentChar,
    typedLines: [],
    typedSource: "",
    typedString: "",
    hasTypo: false,
    typoMap: {},
    startedAt: 0,
    isSuspended: true,
    totalTime: 0,
    isCurrentItemFinished: compiledItem.length === 0 || (compiledItem.length === 1 && currentLine.length === 0),
    isCurrentLineFinished: currentLine.length === 0
  };
};

const getNextState = (previousState: ExerciseItemPlayerState, e: KeyboardEvent): ExerciseItemPlayerState => {
  const { key } = e;

  const nextState: ExerciseItemPlayerState = { ...previousState };

  if (previousState.isSuspended) {
    nextState.isSuspended = false;
    nextState.startedAt = Date.now();
  }

  if (previousState.isCurrentLineFinished) {
    if (key !== "Enter") {
      return nextState;
    }

    const nextLine = previousState.untypedLines[0];
    const nextChar = nextLine[0];

    return {
      ...nextState,
      untypedLines: previousState.untypedLines.slice(1),
      untypedChars: nextLine.slice(1),
      untypedCharStrings: [...nextChar.compiled],
      currentLine: nextLine,
      currentChar: nextChar,
      typedLines: [...previousState.typedLines, previousState.typedString],
      typedSource: "",
      typedString: "",
      isCurrentLineFinished: false
    };
  }

  const updatedUntypedCharStrings = previousState.untypedCharStrings
    .filter(charString => charString[0] === key)
    .map(charString => charString.slice(1));
  if (updatedUntypedCharStrings.length === 0) {
    return {
      ...nextState,
      hasTypo: true
    };
  }

  if (previousState.hasTypo) {
    const previousTypoCount = previousState.typoMap[key] || 0;
    nextState.typoMap[key] = previousTypoCount + 1;
  }

  const nextTypedString = previousState.typedString.concat(key);

  nextState.untypedCharStrings = updatedUntypedCharStrings;
  nextState.typedString = nextTypedString;
  nextState.hasTypo = false;

  const isCurrentCharFinished = updatedUntypedCharStrings.some(charString => charString.length === 0);
  if (!isCurrentCharFinished) {
    return nextState;
  }

  nextState.typedSource = previousState.typedSource.concat(previousState.currentChar.source);
  nextState.untypedChars = previousState.untypedChars.slice(1);

  if (previousState.untypedChars.length !== 0) {
    const nextChar = previousState.untypedChars[0];

    return {
      ...nextState,
      untypedCharStrings: [...nextChar.compiled],
      currentChar: nextChar
    };
  }

  nextState.isCurrentLineFinished = true;

  if (previousState.untypedLines.length !== 0) {
    return nextState;
  }

  return {
    ...nextState,
    isCurrentItemFinished: true,
    isSuspended: true,
    typedLines: [...previousState.typedLines, nextTypedString],
    totalTime: previousState.totalTime + (Date.now() - previousState.startedAt)
  };
};
