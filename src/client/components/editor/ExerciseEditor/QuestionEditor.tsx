import { Avatar, Box, Card, CardContent, CardHeader, IconButton, Menu, MenuItem, TextField } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { MoreVert, Note } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Question } from "../../../../shared/api/entities";
import { rubyAnchorCharacter, rubySeparatorCharacter, rubyTerminatorCharacter } from "../../../../shared/exercise";
import { addRuby } from "../../../domain/exercise/ruby";
import { actions } from "../../../reducers";
import { useStyles } from "../../ui/styles";

export const QuestionEditor = React.memo<{
  bufferId: string;
  questionIndex: number;
  question: Question;
  onFocus: (questionIndex: number) => void;
  onPreview: (questionIndex: number) => void;
}>(({ bufferId, question, questionIndex, onFocus, onPreview }) => {
  const dispatch = useDispatch();

  const [menuAnchorElement, setMenuAnchorElement] = useState(null);
  const [isRubyRequested, toggleRubyState] = useState(false);
  const [isCompositing, toggleCompositionState] = useState(false);

  const { value } = question;

  useEffect(() => {
    if (isRubyRequested) {
      addRuby(value, result => {
        dispatch(actions.exercise.updateQuestion(bufferId, questionIndex, "value", result));
        toggleRubyState(false);
      });
    }
  }, [isRubyRequested]);

  const onDelete = useCallback(() => dispatch(actions.exercise.deleteQuestion(bufferId, questionIndex)), [
    questionIndex
  ]);
  const onUpdateValue = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      dispatch(actions.exercise.updateQuestion(bufferId, questionIndex, "value", e.target.value)),
    [questionIndex]
  );

  const classes = useStyles();
  const textFieldClasses = useTextFieldStyles({ isCompositing });

  return (
    <Card onFocus={useCallback(() => onFocus(questionIndex), [questionIndex])}>
      <CardHeader
        avatar={
          <Avatar className={classes.cardAvatar}>
            <Note />
          </Avatar>
        }
        title={questionIndex.toString()}
        titleTypographyProps={{ variant: "h6" }}
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
              <MenuItem onClick={useCallback(() => onPreview(questionIndex), [questionIndex])}>プレビュー</MenuItem>
              <MenuItem onClick={useCallback(() => toggleRubyState(true), [])}>ルビ</MenuItem>
              <MenuItem onClick={onDelete}>削除</MenuItem>
            </Menu>
          </div>
        }
      />
      <CardContent>
        <Box display="flex" flexDirection="column" position="relative">
          {!isCompositing ? <HighlightedValue value={value} /> : null}
          <TextField
            variant="outlined"
            multiline
            className={textFieldClasses.textField}
            InputProps={{
              classes: {
                inputMultiline: textFieldClasses.inputMultiline
              }
            }}
            onCompositionStart={useCallback(() => toggleCompositionState(true), [])}
            onCompositionEnd={useCallback(() => toggleCompositionState(false), [])}
            value={question.value}
            onChange={onUpdateValue}
          />
        </Box>
      </CardContent>
    </Card>
  );
});

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
