import { Typography } from "@material-ui/core";
import { Delete, Warning } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { EntityId } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card } from "../../ui";

export const DeleteExerciseDraftBufferDialog = createDialog<{
  bufferId: EntityId<"ExerciseDraft">;
}>()(
  React.memo(({ t }) => t("編集の破棄")),
  React.memo(({ bufferId, onClose }) => {
    const dispatch = useDispatch();

    const onDelete = () => {
      dispatch(actions.buffers.delete("ExerciseDraft", bufferId));
      onClose();
    };

    return (
      <>
        <Card icon={<Warning />} title="編集の破棄">
          <Typography>編集内容がブラウザから削除されます。</Typography>
        </Card>
        <Button icon={<Delete color="error" />} label="編集を破棄" labelColor="error" onClick={onDelete} />
      </>
    );
  })
);
