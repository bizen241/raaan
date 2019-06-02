import { AppBar, Dialog, DialogContent, IconButton, Toolbar } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import * as React from "react";
import { useMemo } from "react";
import { Exercise, Question } from "../../../../shared/api/entities";
import { SaveParams } from "../../../../shared/api/request/save";
import { createExercise } from "../../../domain/content";
import { connector } from "../../../reducers";
import { ExercisePlayer } from "../player/ExercisePlayer";

export const QuestionPreviewer = connector(
  ({ dialog }, ownProps: { question: Question }) => ({
    ...ownProps,
    isOpen: dialog.name === "QuestionPreviewer"
  }),
  ({ dialog }) => ({
    onClose: dialog.close
  }),
  ({ question, isOpen, onClose }) => {
    const params = useMemo<SaveParams<Exercise>>(
      () => ({
        ...createExercise(),
        questions: [question]
      }),
      [question]
    );
    const id = useMemo(() => Date.now().toString(), [params, isOpen]);

    return (
      <Dialog fullScreen open={isOpen} onClose={onClose}>
        <AppBar position="relative">
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" onClick={onClose}>
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <ExercisePlayer id={id} params={params} />
        </DialogContent>
      </Dialog>
    );
  }
);
