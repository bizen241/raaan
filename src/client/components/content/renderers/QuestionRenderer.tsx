import { Classes } from "@blueprintjs/core";
import * as React from "react";
import { CompiledQuestion } from "../../../domain/content/compiler";
import { keyframes, styled } from "../../../style";
import { Column, Row } from "../../ui";
import { QuestionPlayerState } from "../player/QuestionPlayer";

export const QuestionRenderer = React.memo<{
  question: CompiledQuestion;
  state: QuestionPlayerState;
}>(({ question, state }) => {
  const currentRubyChunkIndex = question.roman[state.typedLines.length][state.currentChunkIndex].pointer;
  const nextKey =
    question.roman[state.typedLines.length][state.currentChunkIndex].candidates[0][state.currentCharIndex];

  return (
    <Column flex={1}>
      <TypedLinesWrapper>
        <TypedLines>
          <Column flex={1} />
          <Chars className={Classes.TEXT_DISABLED}>
            {question.ruby
              .slice(0, state.typedLines.length)
              .map(rubyLine => rubyLine.map(rubyChunk => rubyChunk.kanji))}
          </Chars>
        </TypedLines>
      </TypedLinesWrapper>
      <TypingLine>
        <TypedCharsWrapper>
          <TypedChars className={Classes.TEXT_DISABLED}>
            {question.ruby[state.typedLines.length].slice(0, currentRubyChunkIndex).map(rubyChunk => rubyChunk.kanji)}
          </TypedChars>
        </TypedCharsWrapper>
        <UntypedCharsWrapper>
          <Chars>
            {question.ruby[state.typedLines.length].slice(currentRubyChunkIndex).map(rubyChunk => rubyChunk.kanji)}
          </Chars>
        </UntypedCharsWrapper>
      </TypingLine>
      <TypingLine>
        <TypedCharsWrapper>
          <TypedChars className={Classes.TEXT_DISABLED}>{state.typedString}</TypedChars>
        </TypedCharsWrapper>
        {state.hasTypo ? <TypoKey key={performance.now()}>{nextKey}</TypoKey> : <Chars>{nextKey}</Chars>}
        <UntypedCharsWrapper>
          <Chars>
            {question.roman[state.typedLines.length][state.currentChunkIndex].candidates[0].slice(
              state.currentCharIndex + 1
            )}
            {question.roman[state.typedLines.length]
              .slice(state.currentChunkIndex + 1)
              .map(romanChunk => romanChunk.candidates[0])}
          </Chars>
        </UntypedCharsWrapper>
      </TypingLine>
      <UntypedLines>
        <Chars className={Classes.TEXT_DISABLED}>
          {question.ruby.slice(state.typedLines.length + 1).map(rubyLine => rubyLine.map(rubyChunk => rubyChunk.kanji))}
        </Chars>
      </UntypedLines>
    </Column>
  );
});

const Chars = styled.span`
  flex-shrink: 0;
  font-size: 4vmax;
  line-height: 1.5em;
  white-space: pre;
`;

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

const TypedLinesWrapper = styled(Column)`
  min-height: 50%;
  position: relative;
  overflow: hidden;
`;

const TypedLines = styled(Column)`
  position: absolute;
  bottom: 0;
  left: 0;
  overflow: hidden;
  flex: 1;
`;

const TypingLine = styled(Row)`
  overflow: hidden;
  flex: none;
`;

const UntypedLines = styled(Column)`
  overflow: hidden;
`;
