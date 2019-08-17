import { Box, Button, Typography } from "@material-ui/core";
import { Warning } from "@material-ui/icons";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createDialog, DialogContent, DialogHeader } from ".";
import { Exercise } from "../../../shared/api/entities";
import { actions } from "../../reducers";
import { useStyles } from "../ui/styles";

export const PublishExerciseDialog = createDialog<{
  exerciseId: string;
}>(
  React.memo(({ exerciseId, onClose }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const onUnpublish = () => {
      dispatch(actions.buffers.add("Exercise", exerciseId));
      dispatch(actions.buffers.update<Exercise>("Exercise", exerciseId, { isPrivate: false }));
      dispatch(actions.api.upload("Exercise", exerciseId));
      onClose();
    };

    return (
      <>
        <DialogHeader onClose={onClose}>
          <Typography>問題集を公開</Typography>
        </DialogHeader>
        <DialogContent>
          <Box display="flex" alignItems="center" flex={1} pb={1}>
            <Warning className={classes.leftIcon} />
            <Typography>問題集が公開されます。</Typography>
          </Box>
          <Box display="flex" flexDirection="column" pb={1}>
            <Button className={classes.largeButton} variant="contained" onClick={onUnpublish}>
              <Typography color="error">問題集を公開</Typography>
            </Button>
          </Box>
          <Box display="flex" flexDirection="column" pb={1}>
            <Button className={classes.largeButton} variant="contained" onClick={onClose}>
              <Typography>キャンセル</Typography>
            </Button>
          </Box>
        </DialogContent>
      </>
    );
  })
);
