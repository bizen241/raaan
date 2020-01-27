import React, { useContext } from "react";
import { createDialog } from "../../../enhancers/createDialog";
import { useSearch } from "../../../hooks/useSearch";
import { FollowerContext, ToggleGroupInvitationList } from "../../lists/group-summaries/ToggleGroupInvitationList";
import { UserContext } from "../../project/Context";
import { DialogContent } from "../../ui";

export const GroupInvitationsDialog = createDialog<{
  followerId: string;
}>(
  React.memo(({ followerId, onClose }) => {
    const currentUser = useContext(UserContext);

    const { onReload: onReloadGroupInvitations } = useSearch("GroupInvitation", {
      targetId: followerId,
      ownerId: currentUser.id
    });

    return (
      <DialogContent title="グループへの招待" onClose={onClose}>
        <FollowerContext.Provider value={followerId}>
          <ToggleGroupInvitationList
            initialParams={{
              ownerId: currentUser.id
            }}
            onReload={onReloadGroupInvitations}
          />
        </FollowerContext.Provider>
      </DialogContent>
    );
  })
);
