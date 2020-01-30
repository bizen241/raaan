import { Typography } from "@material-ui/core";
import { PersonAdd } from "@material-ui/icons";
import { push } from "connected-react-router";
import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { UserContext } from "../../project/Context";
import { Button, Card } from "../../ui";

export const UploadGroupMemberDialog = createDialog<{
  groupId: string;
  groupInvitationId: string;
}>()(
  React.memo(({ t }) => t("グループに参加")),
  React.memo(({ groupId, groupInvitationId }) => {
    const dispatch = useDispatch();
    const currentUser = useContext(UserContext);

    const onUpload = () => {
      dispatch(
        actions.api.upload(
          "GroupMember",
          generateBufferId(),
          {
            groupId,
            userId: currentUser.id
          },
          uploadResponse => {
            dispatch(
              actions.cache.add(
                "GroupMember",
                {
                  groupId,
                  userId: currentUser.id
                },
                uploadResponse
              )
            );
            dispatch(actions.cache.purge("GroupInvitation", groupInvitationId));

            dispatch(push(`/groups/${groupId}`));
          }
        )
      );
    };

    return (
      <>
        <Card>
          <Typography>グループに参加します。</Typography>
        </Card>
        <Button icon={<PersonAdd />} label="参加" onClick={onUpload} />
      </>
    );
  })
);
