import { makeStyles, TextField, Theme } from "@material-ui/core";
import { Delete, PlayArrow, Settings, SpaceBar, Translate } from "@material-ui/icons";
import React, { useCallback, useRef, useState } from "react";
import { Question } from "../../../../shared/api/entities";
import { maskAnchor, maskTerminator } from "../../../../shared/exercise/mask/characters";
import { addRuby } from "../../../domain/exercise/ruby";
import { useToggleState } from "../../../hooks/useToggleState";
import { DeleteQuestionDialog } from "../../dialogs/exercises/DeleteQuestionDialog";
import { QuestionPreviewer } from "../../player/dialogs/QuestionPreviewer";
import { Card, Column, Menu, MenuItem } from "../../ui";
import { Highlighter } from "./Highlighter";

export const QuestionEditor = React.memo<{
  questionIndex: number;
  question: Question;
  onUpdate: (questionIndex: number, question: Partial<Question>) => void;
  onDelete: (questionIndex: number) => void;
}>(({ question, questionIndex, onUpdate, onDelete }) => {
  const [isQuestionPreviewerOpen, onToggleQuestionPreviewer] = useToggleState();
  const [isDeleteQuestionDialogOpen, onToggleDeleteQuestionDialog] = useToggleState();

  const [isAddingRuby, toggleRubyState] = useState(false);
  const [isCompositing, toggleCompositionState] = useState(false);

  const textFieldRef = useRef<HTMLTextAreaElement>(null);
  const textFieldClasses = useTextFieldStyles({ isCompositing });

  const onAddRuby = useCallback(() => {
    if (textFieldRef.current == null) {
      return;
    }

    toggleRubyState(true);

    addRuby(textFieldRef.current.value, (result) => {
      if (textFieldRef.current !== null) {
        onUpdate(questionIndex, { value: result });
      }

      toggleRubyState(false);
    });
  }, [questionIndex]);

  const onAddMask = useCallback(() => {
    if (textFieldRef.current == null) {
      return;
    }

    const { selectionStart, selectionEnd, value: prevValue } = textFieldRef.current;

    const nextValue = `${prevValue.slice(0, selectionStart)}${maskAnchor}${prevValue.slice(
      selectionStart,
      selectionEnd
    )}${maskTerminator}${prevValue.slice(selectionEnd)}`;

    onUpdate(questionIndex, { value: nextValue });
  }, [questionIndex]);

  const { value } = question;

  return (
    <Card
      title={questionIndex.toString()}
      action={
        <Menu>
          <MenuItem icon={<Settings />} label="設定" />
          <MenuItem icon={<PlayArrow />} label="プレビュー" onClick={onToggleQuestionPreviewer} />
          <MenuItem icon={<Translate />} label="ふりがな" onClick={onAddRuby} />
          <MenuItem icon={<SpaceBar />} label="空欄" onClick={onAddMask} />
          <MenuItem icon={<Delete />} label="削除" onClick={onToggleDeleteQuestionDialog} />
        </Menu>
      }
    >
      <Column position="relative">
        {!isCompositing ? <Highlighter value={value} /> : null}
        <TextField
          disabled={isAddingRuby}
          variant="outlined"
          multiline
          className={textFieldClasses.textField}
          InputProps={{
            classes: {
              inputMultiline: textFieldClasses.inputMultiline,
            },
          }}
          onCompositionStart={useCallback(() => toggleCompositionState(true), [])}
          onCompositionEnd={useCallback(() => toggleCompositionState(false), [])}
          inputRef={textFieldRef}
          value={value}
          onChange={useCallback(
            (e: React.ChangeEvent<HTMLTextAreaElement>) => onUpdate(questionIndex, { value: e.target.value }),
            [questionIndex]
          )}
        />
      </Column>
      <QuestionPreviewer question={question} isOpen={isQuestionPreviewerOpen} onClose={onToggleQuestionPreviewer} />
      <DeleteQuestionDialog
        onDelete={useCallback(() => onDelete(questionIndex), [questionIndex])}
        isOpen={isDeleteQuestionDialogOpen}
        onClose={onToggleDeleteQuestionDialog}
      />
    </Card>
  );
});

const useTextFieldStyles = makeStyles<Theme, { isCompositing: boolean }>((theme) => ({
  textField: {
    position: "relative",
    zIndex: 2,
  },
  inputMultiline: (props) => ({
    backgroundColor: "transparent",
    caretColor: theme.palette.type === "light" ? "black" : "white",
    color: props.isCompositing ? "inherit" : "transparent",
  }),
}));
