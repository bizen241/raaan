import { AppBar, Dialog, DialogContent, IconButton, Toolbar } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import * as React from "react";
import { useMemo } from "react";
import { Exercise } from "../../../../shared/api/entities";
import { SaveParams } from "../../../../shared/api/request/save";
import { connector } from "../../../reducers";
import { ExercisePlayer } from "../player/ExercisePlayer";

export const ExercisePreviewer = connector(
  ({ dialog }, ownProps: { params: SaveParams<Exercise> }) => ({
    ...ownProps,
    isOpen: dialog.name === "ExercisePreviewer"
  }),
  ({ dialog }) => ({
    onClose: dialog.close
  }),
  ({ params, isOpen, onClose }) => {
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
