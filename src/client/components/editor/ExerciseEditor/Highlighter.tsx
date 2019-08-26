import { makeStyles } from "@material-ui/core/styles";
import * as React from "react";
import { rubyAnchorCharacter, rubySeparatorCharacter, rubyTerminatorCharacter } from "../../../../shared/exercise";

export const Highlighter = React.memo<{ value: string }>(({ value }) => {
  const classes = useHighlightStyles();

  const highlightedLines: JSX.Element[][] = [];

  value.split("\n").forEach(line => {
    const highlightedLine: JSX.Element[] = [];

    let cursor = 0;
    let matched: RegExpExecArray | null;

    // tslint:disable-next-line: no-conditional-assignment
    while ((matched = rubyRegExp.exec(line)) !== null) {
      const start = matched.index;

      if (cursor !== start) {
        highlightedLine.push(<span key={cursor}>{line.slice(cursor, start)}</span>);

        cursor = start;
      }

      highlightedLine.push(
        <span key={start} style={{ color: "#999" }}>
          {rubyAnchorCharacter}
        </span>,
        <span key={start + 1}>{matched[1]}</span>,
        <span key={start + 2} style={{ color: "#999" }}>
          {rubySeparatorCharacter}
          {matched[2]}
          {rubyTerminatorCharacter}
        </span>
      );

      cursor += matched[0].length;
    }

    if (cursor === 0) {
      highlightedLine.push(<span key={cursor}>{line + "\n"}</span>);
    } else {
      highlightedLine.push(<span key={cursor}>{line.slice(cursor) + "\n"}</span>);
    }

    highlightedLines.push(highlightedLine);
  });

  return <div className={classes.root}>{highlightedLines}</div>;
});

const rubyRegExp = new RegExp(
  `${rubyAnchorCharacter}([^${rubySeparatorCharacter}]+)${rubySeparatorCharacter}([^${rubyTerminatorCharacter}]+)${rubyTerminatorCharacter}`,
  "g"
);

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
    pointerEvents: "none"
  }
}));
