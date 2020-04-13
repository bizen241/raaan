import { makeStyles } from "@material-ui/core";
import React, { useMemo } from "react";
import { CompiledQuestion } from "../../../../shared/exercise/compiler";
import { Column, Row } from "../../ui";
import { QuestionPlayerState } from "../managers/QuestionManager";

export const QuestionRenderer = React.memo<{
  question: CompiledQuestion;
  state: QuestionPlayerState;
}>(({ question, state }) => {
  const classes = useStyles();

  const { roman: romanLines, ruby: rubyLines } = question;
  const { typedLines } = state;

  const currentLineIndex = typedLines.length - 1;
  const currentRomanChunkIndex = typedLines[currentLineIndex].length - 1;

  const currentRomanLine = romanLines[currentLineIndex];
  const currentRomanChunk = currentRomanLine[currentRomanChunkIndex];

  const typedLine = typedLines[currentLineIndex];
  const typedChunk = typedLine[currentRomanChunkIndex];

  const currentCharIndex = typedChunk.length;

  const isRoman = useMemo(() => currentRomanLine.some((romanChunk) => romanChunk.kana !== romanChunk.candidates[0]), [
    currentLineIndex,
  ]);

  const currentCandidates = currentRomanChunk.candidates.filter(
    (candidate) => candidate.slice(0, currentCharIndex) === typedChunk
  );
  const isCurrentLineFinished =
    currentRomanLine.length === currentRomanChunkIndex + 1 &&
    currentCandidates.some((candidate) => candidate === typedChunk);

  const currentRubyLine = rubyLines[currentLineIndex];
  const currentRubyChunkIndex = isCurrentLineFinished ? currentRubyLine.length : currentRomanChunk.pointer;
  const currentRubyChunk = currentRubyLine[currentRubyChunkIndex];

  return (
    <Column className={classes.outerWrapper} alignItems="center" px={2} py={1}>
      <Column className={classes.middleWrapper}>
        <Column flex={1} className={classes.innerWrapper}>
          <div className={classes.typedLinesOuter}>
            <div className={classes.typedLinesInner}>
              {rubyLines.slice(0, currentLineIndex).map((rubyLine, lineIndex) => (
                <div key={lineIndex}>{rubyLine.map(({ kanji }) => kanji)}</div>
              ))}
            </div>
          </div>
          {isRoman && (
            <Row className={classes.currentRubyLine}>
              <div className={classes.typedStringOuter}>
                <span className={classes.typedStringInner}>
                  {currentRubyLine.slice(0, currentRubyChunkIndex).map(({ kanji, ruby }, chunkIndex) => (
                    <ruby key={chunkIndex}>
                      {kanji}
                      <rt>{ruby || ""}</rt>
                    </ruby>
                  ))}
                </span>
              </div>
              {!isCurrentLineFinished && (
                <>
                  <span>
                    <ruby className={currentRubyChunk.isMasked ? classes.mask : undefined}>
                      {currentRubyChunk.kanji}
                      <rt>{currentRubyChunk.ruby || ""}</rt>
                    </ruby>
                  </span>
                  <span className={classes.untypedString}>
                    {currentRubyLine.slice(currentRubyChunkIndex + 1).map(({ kanji, ruby, isMasked }, chunkIndex) => (
                      <ruby key={currentRubyChunkIndex + chunkIndex} className={isMasked ? classes.mask : undefined}>
                        {kanji}
                        <rt>{ruby || ""}</rt>
                      </ruby>
                    ))}
                  </span>
                </>
              )}
            </Row>
          )}
          <Row className={classes.currentRomanLine}>
            <div className={classes.typedStringOuter}>
              <span className={classes.typedStringInner}>{typedLine.join("")}</span>
            </div>
            <span>
              <span className={currentRomanChunk.isMasked ? classes.mask : undefined}>
                {currentCandidates[0].slice(currentCharIndex)}
              </span>
            </span>
            <span className={classes.untypedString}>
              {currentRomanLine.slice(currentRomanChunkIndex + 1).map(({ candidates, isMasked }, chunkIndex) => (
                <span key={currentRomanChunkIndex + chunkIndex} className={isMasked ? classes.mask : undefined}>
                  {candidates[0]}
                </span>
              ))}
            </span>
          </Row>
          <div className={classes.untypedLines}>
            {rubyLines.slice(currentLineIndex + 1).map((rubyLine, lineIndex) => (
              <div key={currentLineIndex + 1 + lineIndex}>
                {rubyLine.map(({ kanji, isMasked }, chunkIndex) => (
                  <span key={chunkIndex} className={isMasked ? classes.mask : undefined}>
                    {kanji}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </Column>
      </Column>
    </Column>
  );
});

const useStyles = makeStyles((theme) => ({
  outerWrapper: {
    height: "100%",
    overflowY: "hidden",
  },
  middleWrapper: {
    height: "100%",
    width: "100%",
    maxWidth: "2000px",
    overflowY: "hidden",
  },
  innerWrapper: {
    overflow: "hidden",
  },
  typedLinesOuter: {
    position: "relative",
    minHeight: "40%",
    overflow: "hidden",
    fontSize: "3vmax",
    color: theme.palette.text.disabled,
  },
  typedLinesInner: {
    position: "absolute",
    bottom: 0,
    left: 0,
    flex: 1,
    overflow: "hidden",
  },
  typedStringOuter: {
    flexShrink: 0,
    maxWidth: "50%",
    overflow: "hidden",
    color: theme.palette.text.disabled,
  },
  typedStringInner: {
    float: "right",
    overflow: "hidden",
    whiteSpace: "pre",
  },
  untypedString: {
    overflow: "hidden",
    whiteSpace: "pre",
  },
  untypedLines: {
    fontSize: "3vmax",
    color: theme.palette.text.disabled,
  },
  currentRubyLine: {
    height: "2em",
    fontSize: "4vmax",
    lineHeight: "2.5em",
  },
  currentRomanLine: {
    fontSize: "4vmax",
    lineHeight: "1.5em",
    paddingBottom: "0.5em",
  },
  mask: {
    color: "transparent",
    backgroundColor: theme.palette.text.disabled,
    borderBottomStyle: "solid",
    borderBottomWidth: "3px",
    borderBottomColor: theme.palette.text.primary,
  },
}));
