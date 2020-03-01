import { Typography } from "@material-ui/core";
import { RemoveCircle } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { EntityId } from "../../../../shared/api/entities";
import { createDialog, dialogTimeout } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card } from "../../ui";

export const CancelGroupInvitationDialog = createDialog<{
  groupInvitationId: EntityId<"GroupInvitation">;
}>()(
  React.memo(({ t }) => t("グループへの招待の取り消し")),
  React.memo(({ groupInvitationId, onClose }) => {
    const dispatch = useDispatch();

    const onDelete = () => {
      dispatch(actions.api.delete("GroupInvitation", groupInvitationId, dialogTimeout, onClose));
    };

    return (
      <>
        <Card>
          <Typography>グループへの招待を取り消します。</Typography>
        </Card>
        <Button icon={<RemoveCircle color="error" />} label="招待を取り消し" labelColor="error" onClick={onDelete} />
      </>
    );
  })
);
