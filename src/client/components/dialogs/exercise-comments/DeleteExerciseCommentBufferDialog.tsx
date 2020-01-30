import { Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card } from "../../ui";

export const DeleteExerciseCommentBufferDialog = createDialog<{
  bufferId: string;
}>()(
  React.memo(({ t }) => t("編集の破棄")),
  React.memo(({ bufferId, onClose }) => {
    const dispatch = useDispatch();

    const onDelete = () => {
      dispatch(actions.buffers.delete("ExerciseComment", bufferId));

      onClose();
    };

    return (
      <>
        <Card>
          <Typography>編集内容がブラウザから削除されます。</Typography>
        </Card>
        <Button icon={<Delete />} label="編集を破棄" labelColor="error" onClick={onDelete} />
      </>
    );
  })
);
