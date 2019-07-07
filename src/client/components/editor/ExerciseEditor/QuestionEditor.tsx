import { Avatar, Box, Card, CardContent, CardHeader, IconButton, Menu, MenuItem, TextField } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { MoreVert, Note } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Exercise, Question } from "../../../../shared/api/entities";
import { addRuby } from "../../../domain/exercise/ruby";
import { actions } from "../../../reducers";
import { useStyles } from "../../ui/styles";
import { Highlighter } from "./Highlighter";

export const QuestionEditor = React.memo<{
  bufferId: string;
  questionIndex: number;
  question: Question;
  onFocus: (questionIndex: number) => void;
  onPreview: (questionIndex: number) => void;
}>(({ bufferId, question, questionIndex, onFocus, onPreview }) => {
  const dispatch = useDispatch();

  const textFieldRef = useRef<HTMLTextAreaElement>(null);

  const [menuAnchorElement, setMenuAnchorElement] = useState(null);
  const [isRubyRequested, toggleRubyState] = useState(false);
  const [isCompositing, toggleCompositionState] = useState(false);

  const classes = useStyles();
  const textFieldClasses = useTextFieldStyles({ isCompositing });

  const { value } = question;

  useEffect(() => {
    if (isRubyRequested) {
      addRuby(value, result => {
        dispatch(
          actions.buffers.updateArrayItem<Exercise>("Exercise", bufferId, "questions", questionIndex, {
            value: result
          })
        );

        if (textFieldRef.current !== null) {
          textFieldRef.current.value = result;
        }

        toggleRubyState(false);
      });
    }
  }, [questionIndex, isRubyRequested]);

  const onDelete = useCallback(
    () => dispatch(actions.buffers.deleteArrayItem<Exercise>("Exercise", bufferId, "questions", questionIndex)),
    [questionIndex]
  );
  const onUpdateValue = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      dispatch(
        actions.buffers.updateArrayItem<Exercise>("Exercise", bufferId, "questions", questionIndex, {
          value: e.target.value
        })
      ),
    [questionIndex]
  );

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
          {!isCompositing ? <Highlighter value={value} /> : null}
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
            inputRef={textFieldRef}
            defaultValue={value}
            onChange={onUpdateValue}
          />
        </Box>
      </CardContent>
    </Card>
  );
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
