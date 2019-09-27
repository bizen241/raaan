import { Box, Button, ButtonGroup, makeStyles, TextField, Theme } from "@material-ui/core";
import * as React from "react";
import { useCallback, useRef, useState } from "react";
import { maskAnchor, maskTerminator } from "../../../../shared/exercise/mask/characters";
import { addRuby } from "../../../domain/exercise/ruby";
import { Column } from "../../ui";
import { Highlighter } from "./Highlighter";

export const HighlightedTextField = React.memo<{
  value: string;
  onChange: (value: string) => void;
}>(({ value, onChange }) => {
  const [isAddingRuby, toggleRubyState] = useState(false);
  const [isCompositing, toggleCompositionState] = useState(false);

  const textFieldRef = useRef<HTMLTextAreaElement>(null);
  const textFieldClasses = useTextFieldStyles({ isCompositing });

  const onAddRuby = useCallback(() => {
    if (textFieldRef.current == null) {
      return;
    }

    toggleRubyState(true);

    addRuby(textFieldRef.current.value, result => {
      if (textFieldRef.current !== null) {
        onChange(result);

        textFieldRef.current.value = result;
      }

      toggleRubyState(false);
    });
  }, []);
  const onAddMask = useCallback(() => {
    const textField = textFieldRef.current;
    if (textField == null) {
      return;
    }

    const { selectionStart, selectionEnd } = textField;

    const prevValue = textField.value;
    const nextValue = `${prevValue.slice(0, selectionStart)}${maskAnchor}${prevValue.slice(
      selectionStart,
      selectionEnd
    )}${maskTerminator}${prevValue.slice(selectionEnd)}`;

    onChange(nextValue);

    textField.value = nextValue;
  }, []);

  return (
    <Box>
      <Box pb={1}>
        <ButtonGroup fullWidth>
          <Button onClick={onAddRuby}>振り仮名</Button>
          <Button onClick={onAddMask}>空欄</Button>
        </ButtonGroup>
      </Box>
      <Column position="relative">
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
          onChange={useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value), [])}
        />
      </Column>
    </Box>
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
