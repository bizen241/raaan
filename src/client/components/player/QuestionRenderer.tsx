import { Box, makeStyles } from "@material-ui/core";
import * as React from "react";
import { useMemo } from "react";
import { CompiledQuestion } from "../../../shared/exercise/compiler";
import { QuestionPlayerState } from "./QuestionPlayer";

export const QuestionRenderer = React.memo<{
  question: CompiledQuestion;
  state: QuestionPlayerState;
}>(({ question, state }) => {
  const { roman: romanLines, ruby: rubyLines } = question;
  const { typedLines } = state;

  const currentLineIndex = typedLines.length - 1;
  const currentRomanChunkIndex = typedLines[currentLineIndex].length - 1;

  const currentRomanLine = romanLines[currentLineIndex];
  const currentRomanChunk = currentRomanLine[currentRomanChunkIndex];

  const typedLine = typedLines[currentLineIndex];
  const typedChunk = typedLine[currentRomanChunkIndex];

  const currentCharIndex = typedChunk.length;

  const isRoman = useMemo(() => currentRomanLine.some(romanChunk => romanChunk.kana !== romanChunk.candidates[0]), [
    currentLineIndex
  ]);

  const currentCandidates = currentRomanChunk.candidates.filter(
    candidate => candidate.slice(0, currentCharIndex) === typedChunk
  );
  const isCurrentLineFinished =
    currentRomanLine.length === currentRomanChunkIndex + 1 &&
    currentCandidates.some(candidate => candidate === typedChunk);

  const currentRubyLine = rubyLines[currentLineIndex];
  const currentRubyChunkIndex = isCurrentLineFinished ? currentRubyLine.length : currentRomanChunk.pointer;
  const currentRubyChunk = currentRubyLine[currentRubyChunkIndex];

  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column" flex={1} height="100%" style={{ overflow: "hidden" }}>
      <Box className={classes.typedLinesOuter} fontSize="3vmax" color="text.disabled">
        <div className={classes.typedLinesInner}>
          {rubyLines.slice(0, currentLineIndex).map((rubyLine, index) => (
            <div key={index}>{rubyLine.map(({ kanji }) => kanji)}</div>
          ))}
        </div>
      </Box>
      <Box display="flex" flexDirection="column" fontSize="4vmax">
        {isRoman ? (
          <Box display="flex">
            <Box className={classes.typedStringWrapper} color="text.disabled">
              <span className={classes.typedString}>
                {currentRubyLine.slice(0, currentRubyChunkIndex).map(({ kanji, ruby }, index) => (
                  <ruby key={index}>
                    {kanji}
                    <rt>{ruby || ""}</rt>
                  </ruby>
                ))}
              </span>
            </Box>
            {!isCurrentLineFinished ? (
              <>
                <span>
                  <ruby key={currentRubyChunkIndex}>
                    {currentRubyChunk.kanji}
                    <rt>{currentRubyChunk.ruby || ""}</rt>
                  </ruby>
                </span>
                <span className={classes.untypedString}>
                  {currentRubyLine.slice(currentRubyChunkIndex + 1).map(({ kanji, ruby }, index) => (
                    <ruby key={currentRubyChunkIndex + index}>
                      {kanji}
                      <rt>{ruby || ""}</rt>
                    </ruby>
                  ))}
                </span>
              </>
            ) : null}
          </Box>
        ) : null}
        <Box display="flex">
          <Box className={classes.typedStringWrapper} color="text.disabled">
            <span className={classes.typedString}>{typedLine.join("")}</span>
          </Box>
          <span>{currentCandidates[0].slice(currentCharIndex)}</span>
          <span>{currentRomanLine.slice(currentRomanChunkIndex + 1).map(romanChunk => romanChunk.candidates[0])}</span>
        </Box>
      </Box>
      <Box fontSize="3vmax" color="text.disabled">
        {rubyLines.slice(currentLineIndex + 1).map((rubyLine, index) => (
          <div key={currentLineIndex + 1 + index}>{rubyLine.map(({ kanji }) => kanji)}</div>
        ))}
      </Box>
    </Box>
  );
});

const useStyles = makeStyles(() => ({
  typedLinesOuter: {
    position: "relative",
    minHeight: "50%",
    overflow: "hidden"
  },
  typedLinesInner: {
    position: "absolute",
    bottom: 0,
    left: 0,
    flex: 1,
    overflow: "hidden"
  },
  typedStringWrapper: {
    flexShrink: 0,
    maxWidth: "50%",
    overflow: "hidden"
  },
  typedString: {
    float: "right",
    overflow: "hidden",
    whiteSpace: "pre",
    height: "2em"
  },
  untypedString: {
    overflow: "hidden",
    whiteSpace: "pre",
    height: "2em"
  }
}));
