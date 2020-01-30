import { Typography } from "@material-ui/core";
import { RemoveCircle } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { createDialog, dialogTimeout } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card } from "../../ui";

export const RejectGroupInvitationDialog = createDialog<{
  groupInvitationId: string;
}>()(
  React.memo(({ t }) => t("グループへの参加を辞退")),
  React.memo(({ groupInvitationId, onClose }) => {
    const dispatch = useDispatch();

    const onDelete = () => {
      dispatch(actions.api.delete("GroupInvitation", groupInvitationId, dialogTimeout, onClose));
    };

    return (
      <>
        <Card>
          <Typography>グループへの参加を辞退します。</Typography>
        </Card>
        <Button icon={<RemoveCircle color="error" />} label="参加を辞退" labelColor="error" onClick={onDelete} />
      </>
    );
  })
);
