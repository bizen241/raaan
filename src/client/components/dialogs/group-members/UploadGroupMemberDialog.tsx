import { Typography } from "@material-ui/core";
import { PersonAdd } from "@material-ui/icons";
import { push } from "connected-react-router";
import React from "react";
import { useDispatch } from "react-redux";
import { EntityId } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { actions } from "../../../reducers";
import { generateLocalEntityId } from "../../../reducers/entity";
import { Button, Card } from "../../ui";

export const UploadGroupMemberDialog = createDialog<{
  groupId: EntityId<"Group">;
  groupInvitationId: EntityId<"GroupInvitation">;
}>()(
  React.memo(({ t }) => t("グループに参加")),
  React.memo(({ groupId, groupInvitationId }) => {
    const dispatch = useDispatch();
    const { currentUser } = useCurrentUser();

    const onUpload = () => {
      dispatch(
        actions.api.upload(
          "GroupMember",
          generateLocalEntityId(),
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
