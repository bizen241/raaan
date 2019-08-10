import { Avatar, Box, Card, CardContent, CardHeader, MenuItem, TextField, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import * as React from "react";
import { useCallback, useRef, useState } from "react";
import { Question } from "../../../../shared/api/entities";
import { addRuby } from "../../../domain/exercise/ruby";
import { Menu } from "../../ui/Menu";
import { useStyles } from "../../ui/styles";
import { Highlighter } from "./Highlighter";

export const QuestionEditor = React.memo<{
  questionIndex: number;
  question: Question;
  onFocus: (questionIndex: number) => void;
  onUpdate: (questionIndex: number, question: Partial<Question>) => void;
  onDelete: (questionIndex: number) => void;
  onPreview: (questionIndex: number) => void;
}>(({ question, questionIndex, onFocus, onUpdate, onDelete, onPreview }) => {
  const textFieldRef = useRef<HTMLTextAreaElement>(null);

  const [isAddingRuby, toggleRubyState] = useState(false);
  const [isCompositing, toggleCompositionState] = useState(false);

  const classes = useStyles();
  const textFieldClasses = useTextFieldStyles({ isCompositing });

  const { value } = question;

  const onAddRuby = useCallback(() => {
    if (textFieldRef.current == null) {
      return;
    }

    toggleRubyState(true);

    addRuby(textFieldRef.current.value, result => {
      if (textFieldRef.current !== null) {
        onUpdate(questionIndex, {
          value: result
        });

        textFieldRef.current.value = result;
      }

      toggleRubyState(false);
    });
  }, [questionIndex]);

  return (
    <Card onFocus={useCallback(() => onFocus(questionIndex), [questionIndex])}>
      <CardHeader
        avatar={
          <Avatar className={classes.cardAvatar}>
            <Typography color="textSecondary">{questionIndex.toString()}</Typography>
          </Avatar>
        }
        // title={question.title}
        action={
          <Menu>
            <MenuItem onClick={useCallback(() => onPreview(questionIndex), [questionIndex])}>プレビュー</MenuItem>
            <MenuItem onClick={useCallback(() => onAddRuby(), [])}>ルビ</MenuItem>
            <MenuItem onClick={useCallback(() => onDelete(questionIndex), [questionIndex])}>削除</MenuItem>
          </Menu>
        }
      />
      <CardContent>
        <Box display="flex" flexDirection="column" position="relative">
          {!isCompositing ? <Highlighter value={value} /> : null}
          <TextField
            disabled={isAddingRuby}
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
            onChange={useCallback(
              (e: React.ChangeEvent<HTMLTextAreaElement>) =>
                onUpdate(questionIndex, {
                  value: e.target.value
                }),
              [questionIndex]
            )}
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
