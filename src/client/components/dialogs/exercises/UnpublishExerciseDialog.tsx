import { Typography } from "@material-ui/core";
import { Lock } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { EntityId } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card } from "../../ui";

export const UnpublishExerciseDialog = createDialog<{
  exerciseId: EntityId<"Exercise">;
}>()(
  React.memo(({ t }) => t("問題集の公開を終了")),
  React.memo(({ exerciseId, onClose }) => {
    const dispatch = useDispatch();

    const onUnpublish = () =>
      dispatch(
        actions.api.upload(
          "Exercise",
          exerciseId,
          {
            isPrivate: true,
          },
          onClose
        )
      );

    return (
      <>
        <Card>
          <Typography>問題集が非公開に設定されます。</Typography>
        </Card>
        <Button icon={<Lock />} label="問題集の公開を終了" onClick={onUnpublish} />
      </>
    );
  })
);
