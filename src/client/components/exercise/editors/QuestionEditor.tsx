import { Card, CardContent, CardHeader, IconButton, Menu, MenuItem, TextField } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { MoreVert } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { Question } from "../../../../shared/api/entities";
import {
  addRuby,
  rubyAnchorCharacter,
  rubySeparatorCharacter,
  rubyTerminatorCharacter
} from "../../../domain/content/ruby";
import { connector } from "../../../reducers";
import { Column } from "../../ui";

export const QuestionEditor = connector(
  (
    _,
    ownProps: {
      bufferId: string;
      questionIndex: number;
      question: Question;
      onFocus: (questionIndex: number) => void;
    }
  ) => ({
    ...ownProps
  }),
  actions => ({
    ...actions.exercise,
    openDialog: actions.dialog.open
  }),
  ({ bufferId, question, questionIndex, updateQuestion, deleteQuestion, openDialog, onFocus }) => {
    const [menuAnchorElement, setMenuAnchorElement] = useState(null);
    const [isRubyRequested, toggleRubyState] = useState(false);
    const [isCompositing, toggleCompositionState] = useState(false);

    const { value } = question;

    useEffect(() => {
      if (isRubyRequested) {
        addRuby(value, result => {
          updateQuestion(bufferId, questionIndex, "value", result);
          toggleRubyState(false);
        });
      }
    }, [isRubyRequested]);

    const classes = useTextFieldStyles({ isCompositing });

    return (
      <Card onFocus={useCallback(() => onFocus(questionIndex), [questionIndex])}>
        <CardHeader
          title={questionIndex.toString()}
          action={
            <div>
              <IconButton onClick={useCallback(e => setMenuAnchorElement(e.currentTarget), [])}>
                <MoreVert />
              </IconButton>
              <Menu
                anchorEl={menuAnchorElement}
                open={Boolean(menuAnchorElement)}
                onClose={useCallback(() => setMenuAnchorElement(null), [])}
              >
                <MenuItem onClick={useCallback(() => openDialog("QuestionPreviewer"), [])}>プレビュー</MenuItem>
                <MenuItem onClick={useCallback(() => toggleRubyState(true), [])}>ルビ</MenuItem>
                <MenuItem onClick={useCallback(() => deleteQuestion(bufferId, questionIndex), [questionIndex])}>
                  削除
                </MenuItem>
              </Menu>
            </div>
          }
        />
        <CardContent>
          <Column style={{ position: "relative" }}>
            {!isCompositing ? <HighlightedValue value={value} /> : null}
            <TextField
              variant="outlined"
              multiline
              className={classes.textField}
              InputProps={{
                classes: {
                  inputMultiline: classes.inputMultiline
                }
              }}
              onCompositionStart={useCallback(() => toggleCompositionState(true), [])}
              onCompositionEnd={useCallback(() => toggleCompositionState(false), [])}
              value={question.value}
              onChange={useCallback(
                (e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  updateQuestion(bufferId, questionIndex, "value", e.target.value),
                [questionIndex]
              )}
            />
          </Column>
        </CardContent>
      </Card>
    );
  }
);

const rubyRegExp = new RegExp(
  `${rubyAnchorCharacter}([^${rubySeparatorCharacter}]+)${rubySeparatorCharacter}([^${rubyTerminatorCharacter}]+)${rubyTerminatorCharacter}`,
  "g"
);

const HighlightedValue = React.memo<{ value: string }>(({ value }) => {
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

const useTextFieldStyles = makeStyles<Theme, { isCompositing: boolean }>(theme => ({
  textField: {
    position: "relative",
    zIndex: 2
  },
  inputMultiline: props => ({
    backgroundColor: "transparent",
    caretColor: theme.palette.type === "light" ? "black" : "white",
    color: props.isCompositing ? "inherit" : "transparent"
  })
}));

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
    pointerEvents: "none"
  }
}));
