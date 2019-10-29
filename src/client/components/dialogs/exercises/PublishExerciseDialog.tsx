import { Typography } from "@material-ui/core";
import { Warning } from "@material-ui/icons";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card, DialogContent } from "../../ui";

export const PublishExerciseDialog = createDialog<{
  exerciseId: string;
}>(
  React.memo(({ exerciseId, onClose }) => {
    const dispatch = useDispatch();

    const onUnpublish = () =>
      dispatch(
        actions.api.upload(
          "Exercise",
          exerciseId,
          {
            isPrivate: false
          },
          onClose
        )
      );

    return (
      <DialogContent title="問題集を公開" onClose={onClose}>
        <Card icon={<Warning />} title="問題集を公開">
          <Typography>問題集が公開されます。</Typography>
        </Card>
        <Button label="問題集を公開する" onClick={onUnpublish} />
      </DialogContent>
    );
  })
);
