import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import {
  annotationAnchor,
  annotationSeparator,
  annotationTerminator,
  annotationWithAnchor,
  annotationWithoutAnchor,
  rubyWithAnchorRegExp,
  rubyWithoutAnchorRegExp,
} from "../../../../shared/exercise/compiler/ruby";
import { rubyAnchor, rubySeparator, rubyTerminator } from "../../../../shared/exercise/ruby/characters";

export const Highlighter = React.memo<{ value: string }>(({ value }) => {
  const classes = useHighlightStyles();

  const highlightedLines: JSX.Element[][] = [];

  value.split("\n").forEach((sourceLine, lineNumber) => {
    const highlightedLine: JSX.Element[] = [];

    const splitedByTerminatorTexts = sourceLine
      .replace(rubyWithAnchorRegExp, annotationWithAnchor)
      .replace(rubyWithoutAnchorRegExp, annotationWithoutAnchor)
      .split(annotationTerminator);

    if (splitedByTerminatorTexts.length === 1) {
      highlightedLine.push(<span key={lineNumber}>{sourceLine + "\n"}</span>);
    } else {
      splitedByTerminatorTexts.forEach((chunk, index) => {
        const [intermediateText, rubyText] = chunk.split(annotationSeparator);
        const [unrubiedText, parentText] = intermediateText.split(annotationAnchor);

        if (unrubiedText.length > 0) {
          highlightedLine.push(<span key={`${lineNumber}${index}`}>{unrubiedText}</span>);
        }
        if (parentText !== undefined) {
          highlightedLine.push(
            <span key={`${lineNumber}${index}a`} style={{ color: "#999" }}>
              {rubyAnchor}
            </span>,
            <span key={`${lineNumber}${index}p`}>{parentText}</span>
          );
        }
        if (rubyText !== undefined) {
          highlightedLine.push(
            <span key={`${lineNumber}${index}r`} style={{ color: "#999" }}>
              {rubySeparator}
              {rubyText}
              {rubyTerminator}
            </span>
          );
        }
      });

      highlightedLine.push(<span key={`${lineNumber}n`}>{"\n"}</span>);
    }

    highlightedLines.push(highlightedLine);
  });

  return <div className={classes.root}>{highlightedLines}</div>;
});

const useHighlightStyles = makeStyles(() => ({
  root: {
    padding: "18.5px 14px",
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1,
    backgroundColor: "transparent",
    lineHeight: "1.1875em",
    color: "inherit",
    fontSize: "16px",
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    letterSpacing: "initial",
    pointerEvents: "none",
  },
}));
