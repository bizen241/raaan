import { Typography } from "@material-ui/core";
import { Delete, Warning } from "@material-ui/icons";
import { goBack } from "connected-react-router";
import React from "react";
import { useDispatch } from "react-redux";
import { createDialog, dialogTimeout } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card, DialogContent } from "../../ui";

export const DeleteExerciseDialog = createDialog<{
  exerciseId: string;
}>(
  React.memo(({ exerciseId, onClose }) => {
    const dispatch = useDispatch();

    const onDelete = () => {
      dispatch(
        actions.api.delete("Exercise", exerciseId, dialogTimeout, () => {
          dispatch(goBack());
        })
      );
    };

    return (
      <DialogContent title="問題集の削除" onClose={onClose}>
        <Card icon={<Warning />} title="問題集の削除">
          <Typography>問題集がサーバーから削除されます。</Typography>
        </Card>
        <Button icon={<Delete color="error" />} label="問題集を削除" labelColor="error" onClick={onDelete} />
      </DialogContent>
    );
  })
);
