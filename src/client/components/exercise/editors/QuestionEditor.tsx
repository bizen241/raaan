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
import { styled } from "../../../style";
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

    const valueChunks: JSX.Element[] = [];
    const valueLines = value.split("\n");
    valueLines.forEach(line => {
      let cursor = 0;
      let matched: RegExpExecArray | null;

      const rubyRegExp = new RegExp(
        `${rubyAnchorCharacter}([^${rubySeparatorCharacter}]+)${rubySeparatorCharacter}([^${rubyTerminatorCharacter}]+)${rubyTerminatorCharacter}`,
        "g"
      );

      // tslint:disable-next-line: no-conditional-assignment
      while ((matched = rubyRegExp.exec(line)) !== null) {
        const start = matched.index;

        if (cursor !== start) {
          valueChunks.push(<span key={cursor}>{line.slice(cursor, start)}</span>);
        }

        valueChunks.push(
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
        valueChunks.push(<span key="last">{line + "\n"}</span>);
      } else {
        valueChunks.push(<span key="last">{line.slice(cursor) + "\n"}</span>);
      }
    });

    const classes = useStyles({ isCompositing });

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
            {!isCompositing ? <Highlight>{valueChunks}</Highlight> : null}
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
              defaultValue={question.value}
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

const useStyles = makeStyles<Theme, { isCompositing: boolean }>(theme => ({
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

const Highlight = styled.div`
  position: absolute;
  font-size: 16px;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  line-height: 1.1875em;
  z-index: 1;
  pointer-events: none;
  background-color: transparent;
  padding: 18.5px 14px
  white-space: pre-wrap;
  word-wrap: break-word;
  color: inherit;
  width: 100%;
  height: 100%;
`;
