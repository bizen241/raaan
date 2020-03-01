import { Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { EntityId } from "../../../../shared/api/entities";
import { createDialog, dialogTimeout } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card } from "../../ui";

export const DeleteObjectionDialog = createDialog<{
  objectionId: EntityId<"Objection">;
}>()(
  React.memo(({ t }) => t("抗議の削除")),
  React.memo(({ objectionId, onClose }) => {
    const dispatch = useDispatch();

    const onDelete = () => {
      dispatch(actions.api.delete("Objection", objectionId, dialogTimeout, onClose));
    };

    return (
      <>
        <Card>
          <Typography>抗議がサーバーから削除されます。</Typography>
        </Card>
        <Button icon={<Delete color="error" />} label="抗議を削除" labelColor="error" onClick={onDelete} />
      </>
    );
  })
);
