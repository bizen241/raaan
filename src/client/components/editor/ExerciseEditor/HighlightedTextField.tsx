import { Box, Button, makeStyles, TextField, Theme } from "@material-ui/core";
import * as React from "react";
import { useCallback, useRef, useState } from "react";
import { addRuby } from "../../../domain/exercise/ruby";
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

  return (
    <Box>
      <Button onClick={onAddRuby}>振り仮名</Button>
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
          onChange={useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value), [])}
        />
      </Box>
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
