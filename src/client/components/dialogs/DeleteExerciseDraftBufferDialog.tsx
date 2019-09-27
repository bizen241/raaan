import { Button, Typography } from "@material-ui/core";
import { Warning } from "@material-ui/icons";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../enhancers/createDialog";
import { actions } from "../../reducers";
import { Column, DialogContent, DialogHeader, Row } from "../ui";
import { useStyles } from "../ui/styles";

export const DeleteExerciseDraftBufferDialog = createDialog<{
  bufferId: string;
}>(
  React.memo(({ bufferId, onClose }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const onDelete = () => {
      dispatch(actions.buffers.delete("ExerciseDraft", bufferId));
      onClose();
    };

    return (
      <>
        <DialogHeader onClose={onClose}>
          <Typography>編集の破棄</Typography>
        </DialogHeader>
        <DialogContent>
          <Row alignItems="center" flex={1} pb={1}>
            <Warning className={classes.leftIcon} />
            <Typography>編集内容がブラウザから削除されます。</Typography>
          </Row>
          <Column pb={1}>
            <Button className={classes.largeButton} variant="contained" onClick={onDelete}>
              <Typography color="error">編集を破棄</Typography>
            </Button>
          </Column>
          <Column pb={1}>
            <Button className={classes.largeButton} variant="contained" onClick={onClose}>
              <Typography>キャンセル</Typography>
            </Button>
          </Column>
        </DialogContent>
      </>
    );
  })
);
