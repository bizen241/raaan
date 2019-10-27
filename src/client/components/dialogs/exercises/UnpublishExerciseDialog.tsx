import { Typography } from "@material-ui/core";
import { Lock, Warning } from "@material-ui/icons";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card, DialogContent2 } from "../../ui";

export const UnpublishExerciseDialog = createDialog<{
  exerciseId: string;
}>(
  React.memo(({ exerciseId, onClose }) => {
    const dispatch = useDispatch();

    const onUnpublish = () => {
      dispatch(
        actions.api.upload(
          "Exercise",
          exerciseId,
          {
            isPrivate: true
          },
          onClose
        )
      );
    };

    return (
      <DialogContent2 title="問題集の公開を終了" onClose={onClose}>
        <Card icon={<Warning />} title="問題集の公開を終了">
          <Typography>問題集が非公開に設定されます。</Typography>
        </Card>
        <Button icon={<Lock />} label="問題集の公開を終了" onClick={onUnpublish} />
      </DialogContent2>
    );
  })
);
