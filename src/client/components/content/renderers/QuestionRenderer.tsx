import { Classes, Icon } from "@blueprintjs/core";
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
  requireEnter: boolean;
}>(({ question, state, isFinished, requireEnter }) => {
  const { roman: romanLines, ruby: rubyLines } = question;
  const { typedLines, typedString, currentChunkIndex, currentCharIndex, hasTypo } = state;

  const currentLineIndex = isFinished ? question.roman.length - 1 : typedLines.length;
  const typedRomanString = !isFinished ? typedString : typedLines[currentLineIndex];

  const currentRomanLine = romanLines[currentLineIndex];
  const currentRomanChunk = currentRomanLine[currentChunkIndex];

  const isRoman = useMemo(() => currentRomanLine.some(romanChunk => romanChunk.kana !== romanChunk.candidates[0]), [
    currentLineIndex
  ]);

  return (
    <Column flex={1}>
      <TypedLines rubyLines={rubyLines} currentLineIndex={currentLineIndex} />
      <TypingRubyLine
        currentRubyLine={rubyLines[currentLineIndex]}
        currentRomanChunk={currentRomanChunk}
        isRoman={isRoman}
        isFinished={isFinished}
      />
      <TypingRomanLine
        currentRomanLine={currentRomanLine}
        currentRomanChunkIndex={currentChunkIndex}
        currentCharIndex={currentCharIndex}
        typedRomanString={typedRomanString}
        hasTypo={hasTypo}
        requireEnter={requireEnter}
        isFinished={isFinished}
      />
      <UntypedLines rubyLines={rubyLines} currentLineIndex={currentLineIndex} />
    </Column>
  );
});

const Chars = styled.div`
  flex-shrink: 0;
  font-size: 4vmax;
  line-height: 1.5em;
  min-height: 1.5em;
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
  align-items: center;
  overflow: hidden;
  flex: none;
`;

const TypingRubyLine = React.memo<{
  currentRubyLine: RubyChunk[];
  currentRomanChunk: RomanChunk | undefined;
  isRoman: boolean;
  isFinished: boolean;
}>(({ currentRubyLine, currentRomanChunk, isRoman, isFinished }) => {
  if (!isRoman) {
    return null;
  }

  const currentRubyChunkIndex =
    currentRomanChunk === undefined || isFinished ? currentRubyLine.length : currentRomanChunk.pointer;

  return (
    <TypingLineWrapper>
      <TypedCharsWrapper>
        <TypedChars className={Classes.TEXT_DISABLED}>
          <RubyChunks rubyLine={currentRubyLine.slice(0, currentRubyChunkIndex)} />
        </TypedChars>
      </TypedCharsWrapper>
      <UntypedCharsWrapper>
        <Chars>
          <RubyChunks rubyLine={currentRubyLine.slice(currentRubyChunkIndex)} />
        </Chars>
      </UntypedCharsWrapper>
    </TypingLineWrapper>
  );
});

const TypedRoman: React.FunctionComponent<{
  typedRomanString: string;
}> = ({ typedRomanString }) => {
  return (
    <TypedCharsWrapper>
      <TypedChars className={Classes.TEXT_DISABLED}>{typedRomanString}</TypedChars>
    </TypedCharsWrapper>
  );
};

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

const TypingRoman: React.FunctionComponent<{
  currentRomanChunk: RomanChunk | undefined;
  currentCharIndex: number;
  hasTypo: boolean;
  isFinished: boolean;
}> = ({ currentRomanChunk, currentCharIndex, hasTypo, isFinished }) => {
  if (currentRomanChunk === undefined || isFinished) {
    return null;
  }

  const nextKey = currentRomanChunk.candidates[0][currentCharIndex];

  return hasTypo ? <TypoKey key={performance.now()}>{nextKey}</TypoKey> : <Chars>{nextKey}</Chars>;
};

const UntypedRoman: React.FunctionComponent<{
  currentRomanLine: RomanChunk[];
  currentRomanChunk: RomanChunk | undefined;
  currentRomanChunkIndex: number;
  currentCharIndex: number;
  isFinished: boolean;
}> = ({ currentRomanLine, currentRomanChunk, currentRomanChunkIndex, currentCharIndex, isFinished }) => {
  if (currentRomanChunk === undefined || isFinished) {
    return null;
  }

  return (
    <UntypedCharsWrapper>
      <Chars>
        {currentRomanChunk.candidates[0].slice(currentCharIndex + 1)}
        {currentRomanLine.slice(currentRomanChunkIndex + 1).map(romanChunk => romanChunk.candidates[0])}
      </Chars>
    </UntypedCharsWrapper>
  );
};

const TypingRomanLine = React.memo<{
  currentRomanLine: RomanChunk[];
  currentRomanChunkIndex: number;
  currentCharIndex: number;
  typedRomanString: string;
  hasTypo: boolean;
  requireEnter: boolean;
  isFinished: boolean;
}>(
  ({
    typedRomanString,
    hasTypo,
    currentRomanLine,
    currentRomanChunkIndex,
    currentCharIndex,
    requireEnter,
    isFinished
  }) => {
    const currentRomanChunk = currentRomanLine[currentRomanChunkIndex];

    return (
      <TypingLineWrapper>
        <TypedRoman typedRomanString={typedRomanString} />
        <TypingRoman
          currentRomanChunk={currentRomanChunk}
          currentCharIndex={currentCharIndex}
          hasTypo={hasTypo}
          isFinished={isFinished}
        />
        <UntypedRoman
          currentRomanLine={currentRomanLine}
          currentRomanChunk={currentRomanChunk}
          currentRomanChunkIndex={currentRomanChunkIndex}
          currentCharIndex={currentCharIndex}
          isFinished={isFinished}
        />
        {requireEnter ? <Icon icon="key-enter" /> : null}
      </TypingLineWrapper>
    );
  }
);

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
