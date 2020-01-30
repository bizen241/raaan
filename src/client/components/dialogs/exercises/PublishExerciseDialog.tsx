import { Typography } from "@material-ui/core";
import { Public } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card } from "../../ui";

export const PublishExerciseDialog = createDialog<{
  exerciseId: string;
}>()(
  React.memo(({ t }) => t("問題集を公開")),
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
      <>
        <Card>
          <Typography>問題集が公開されます。</Typography>
        </Card>
        <Button icon={<Public />} label="問題集を公開する" onClick={onUnpublish} />
      </>
    );
  })
);
