import { Typography } from "@material-ui/core";
import { RemoveCircle } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { createDialog, dialogTimeout } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card } from "../../ui";

export const DeleteGroupMemberDialog = createDialog<{
  groupMemberId: string;
}>()(
  React.memo(({ t }) => t("グループからの脱退")),
  React.memo(({ groupMemberId, onClose }) => {
    const dispatch = useDispatch();

    const onDelete = () => {
      dispatch(actions.api.delete("GroupMember", groupMemberId, dialogTimeout, onClose));
    };

    return (
      <>
        <Card>
          <Typography>グループから脱退します。</Typography>
        </Card>
        <Button icon={<RemoveCircle />} label="グループから脱退" onClick={onDelete} />
      </>
    );
  })
);
