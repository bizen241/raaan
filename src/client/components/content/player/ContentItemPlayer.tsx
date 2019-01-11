import * as React from "react";
import { useEffect, useState } from "react";
import { ContentItem } from "../../../../shared/content";
import { CompiledChar, CompiledItem, CompiledLine } from "../../../domain/content/compiler";
import { ContentItemResult } from "../../../reducers/player";
import { Chars, Column } from "../../ui";

interface ContentItemPlayerState {
  untypedLines: CompiledItem;
  untypedChars: CompiledLine;
  untypedCharStrings: string[];
  currentLine: CompiledLine;
  currentChar: CompiledChar;
  typedLines: string[];
  typedString: string;
  hasTypo: boolean;
  isCurrentItemFinished: boolean;
  isCurrentLineFinished: boolean;
}

export const ContentItemPlayer: React.FunctionComponent<{
  item: ContentItem;
  compiledItem: CompiledItem;
  onFinish: (result: ContentItemResult) => void;
}> = ({ item, compiledItem, onFinish }) => {
  const [state, setState] = useState<ContentItemPlayerState>(() => getInitialState(compiledItem));

  useEffect(
    () => {
      if (state.isCurrentItemFinished) {
        onFinish({
          id: item.id,
          accuracy: 100,
          time: 0
        });
      }

      const onKeyDown = (e: KeyboardEvent) => {
        setState(previousState => getNextState(previousState, e));
      };

      document.addEventListener("keydown", onKeyDown);
      return () => document.removeEventListener("keydown", onKeyDown);
    },
    [state.isCurrentItemFinished]
  );

  const untypedString = state.untypedChars.map(char => char.compiled[0]).join("");

  if (item.type !== "kanji") {
    return null;
  }

  return (
    <Column>
      <Chars>{item.kanji}</Chars>
      <Chars>{item.value}</Chars>
      <Chars>
        {state.typedString}/{state.untypedCharStrings[0]}
        {untypedString}
      </Chars>
    </Column>
  );
};

const getInitialState = (compiledItem: CompiledItem): ContentItemPlayerState => {
  const currentLine = compiledItem[0] || [];
  const currentChar = currentLine[0];

  return {
    untypedLines: compiledItem.slice(1),
    untypedChars: currentLine.slice(1),
    untypedCharStrings: [...(currentLine.length !== 0 ? currentChar.compiled : [])],
    currentLine,
    currentChar,
    typedLines: [],
    typedString: "",
    hasTypo: false,
    isCurrentItemFinished: compiledItem.length === 0 || (compiledItem.length === 1 && currentLine.length === 0),
    isCurrentLineFinished: currentLine.length === 0
  };
};

const getNextState = (previousState: ContentItemPlayerState, e: KeyboardEvent): ContentItemPlayerState => {
  const { key } = e;

  if (previousState.isCurrentItemFinished) {
    return previousState;
  }

  if (previousState.isCurrentLineFinished) {
    if (key !== "Enter") {
      return previousState;
    }

    const nextLine = previousState.untypedLines[0];
    const nextChar = nextLine[0];

    return {
      ...previousState,
      untypedLines: previousState.untypedLines.slice(1),
      untypedChars: nextLine.slice(1),
      untypedCharStrings: [...nextChar.compiled],
      currentLine: nextLine,
      currentChar: nextChar,
      typedLines: [...previousState.typedLines, previousState.typedString],
      typedString: "",
      isCurrentLineFinished: false
    };
  }

  const updatedUntypedCharStrings = previousState.untypedCharStrings
    .filter(charString => charString[0] === key)
    .map(charString => charString.slice(1));
  if (updatedUntypedCharStrings.length === 0) {
    return {
      ...previousState,
      hasTypo: true
    };
  }

  const nextState: ContentItemPlayerState = {
    ...previousState,
    untypedCharStrings: updatedUntypedCharStrings,
    typedString: previousState.typedString.concat(key),
    hasTypo: false
  };

  const isCurrentCharFinished = updatedUntypedCharStrings.some(charString => charString.length === 0);
  if (!isCurrentCharFinished) {
    return nextState;
  }

  if (previousState.untypedChars.length !== 0) {
    const nextChar = previousState.untypedChars[0];

    return {
      ...nextState,
      untypedChars: previousState.untypedChars.slice(1),
      untypedCharStrings: [...nextChar.compiled],
      currentChar: nextChar
    };
  }

  if (previousState.untypedLines.length !== 0) {
    return {
      ...nextState,
      isCurrentLineFinished: true
    };
  }

  return {
    ...nextState,
    isCurrentItemFinished: true
  };
};
