import { Classes } from "@blueprintjs/core";
import * as React from "react";
import { useMemo } from "react";
import { CompiledQuestion, RomanChunk, RubyChunk } from "../../../domain/content/compiler";
import { keyframes, styled } from "../../../style";
import { Column, Row } from "../../ui";
import { QuestionPlayerState } from "../player/QuestionPlayer";

export const QuestionRenderer = React.memo<{
  question: CompiledQuestion;
  state: QuestionPlayerState;
  isFinished: boolean;
}>(({ question, state, isFinished }) => {
  const currentLineIndex = state.typedLines.length;

  if (isFinished) {
    return (
      <Column flex={1}>
        <TypedLines rubyLines={question.ruby} currentLineIndex={currentLineIndex} />
      </Column>
    );
  }

  const currentRomanLine = question.roman[currentLineIndex];
  const currentRomanChunkIndex = state.currentChunkIndex;

  const currentRubyLine = question.ruby[currentLineIndex];
  const currentRubyChunkIndex = currentRomanLine[currentRomanChunkIndex].pointer;

  const isRoman = useMemo(() => currentRomanLine.some(romanChunk => romanChunk.kana !== romanChunk.candidates[0]), [
    currentLineIndex
  ]);

  return (
    <Column flex={1}>
      <TypedLines rubyLines={question.ruby} currentLineIndex={currentLineIndex} />
      {isRoman ? <TypingRubyLine rubyLine={currentRubyLine} currentRubyChunkIndex={currentRubyChunkIndex} /> : null}
      <TypingRomanLine
        typedString={state.typedString}
        hasTypo={state.hasTypo}
        romanLine={currentRomanLine}
        currentRomanChunkIndex={currentRomanChunkIndex}
        currentCharIndex={state.currentCharIndex}
      />
      <UntypedLines rubyLines={question.ruby} currentLineIndex={currentLineIndex} />
    </Column>
  );
});

const Chars = styled.span`
  flex-shrink: 0;
  font-size: 4vmax;
  line-height: 1.5em;
  white-space: pre;
`;

const RubyChunks = React.memo<{
  rubyLine: RubyChunk[];
}>(({ rubyLine }) => {
  return (
    <>
      {rubyLine.map((rubyChunk, index) => (
        <ruby key={index}>
          {rubyChunk.kanji}
          <rt>{rubyChunk.ruby || ""}</rt>
        </ruby>
      ))}
    </>
  );
});

const TypedLinesOuterWrapper = styled(Column)`
  min-height: 50%;
  position: relative;
  overflow: hidden;
`;

const TypedLinesInnerWrapper = styled(Column)`
  position: absolute;
  bottom: 0;
  left: 0;
  overflow: hidden;
  flex: 1;
`;

const TypedLines = React.memo<{
  rubyLines: RubyChunk[][];
  currentLineIndex: number;
}>(({ rubyLines, currentLineIndex }) => {
  return (
    <TypedLinesOuterWrapper>
      <TypedLinesInnerWrapper>
        <Column flex={1} />
        {rubyLines.slice(0, currentLineIndex).map((rubyLine, index) => (
          <Chars key={index} className={Classes.TEXT_DISABLED}>
            {rubyLine.map(rubyChunk => rubyChunk.kanji)}
          </Chars>
        ))}
      </TypedLinesInnerWrapper>
    </TypedLinesOuterWrapper>
  );
});

const TypedCharsWrapper = styled.div`
  flex-shrink: 0;
  max-width: 50%;
  overflow: hidden;
`;

const TypedChars = styled(Chars)`
  float: right;
  overflow: hidden;
`;

const UntypedCharsWrapper = styled(Row)`
  overflow: hidden;
`;

const TypingLineWrapper = styled(Row)`
  overflow: hidden;
  flex: none;
`;

const TypingRubyLine = React.memo<{
  rubyLine: RubyChunk[];
  currentRubyChunkIndex: number;
}>(({ rubyLine, currentRubyChunkIndex }) => {
  return (
    <TypingLineWrapper>
      <TypedCharsWrapper>
        <TypedChars className={Classes.TEXT_DISABLED}>
          <RubyChunks rubyLine={rubyLine.slice(0, currentRubyChunkIndex)} />
        </TypedChars>
      </TypedCharsWrapper>
      <UntypedCharsWrapper>
        <Chars>
          <RubyChunks rubyLine={rubyLine.slice(currentRubyChunkIndex)} />
        </Chars>
      </UntypedCharsWrapper>
    </TypingLineWrapper>
  );
});

const scale = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
`;

const TypoKey = styled(Chars)`
  animation: ${scale} 100ms ease-out;
`;

const TypingRomanLine = React.memo<{
  typedString: string;
  hasTypo: boolean;
  romanLine: RomanChunk[];
  currentRomanChunkIndex: number;
  currentCharIndex: number;
}>(({ typedString, hasTypo, romanLine, currentRomanChunkIndex, currentCharIndex }) => {
  const currentRomanChunk = romanLine[currentRomanChunkIndex];
  const nextKey = currentRomanChunk.candidates[0][currentCharIndex];

  return (
    <TypingLineWrapper>
      <TypedCharsWrapper>
        <TypedChars className={Classes.TEXT_DISABLED}>{typedString}</TypedChars>
      </TypedCharsWrapper>
      {hasTypo ? <TypoKey key={performance.now()}>{nextKey}</TypoKey> : <Chars>{nextKey}</Chars>}
      <UntypedCharsWrapper>
        <Chars>
          {currentRomanChunk.candidates[0].slice(currentCharIndex + 1)}
          {romanLine.slice(currentRomanChunkIndex + 1).map(romanChunk => romanChunk.candidates[0])}
        </Chars>
      </UntypedCharsWrapper>
    </TypingLineWrapper>
  );
});

const UntypedLinesWrapper = styled(Column)`
  overflow: hidden;
`;

const UntypedLines = React.memo<{
  rubyLines: RubyChunk[][];
  currentLineIndex: number;
}>(({ rubyLines, currentLineIndex }) => {
  const start = currentLineIndex + 1;

  return (
    <UntypedLinesWrapper>
      {rubyLines.slice(start).map((rubyLine, index) => (
        <Chars key={index} className={Classes.TEXT_DISABLED}>
          {rubyLine.map(rubyChunk => rubyChunk.kanji)}
        </Chars>
      ))}
    </UntypedLinesWrapper>
  );
});
