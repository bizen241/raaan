import React, { useContext } from "react";
import { createDialog } from "../../../enhancers/createDialog";
import { useSearch } from "../../../hooks/useSearch";
import { GroupContext, ToggleGroupInvitationList } from "../../lists/user-follows/ToggleGroupInvitationList";
import { UserContext } from "../../project/Context";
import { DialogContent } from "../../ui";

export const GroupInvitationsDialog = createDialog<{
  groupId: string;
}>(
  React.memo(({ groupId, onClose }) => {
    const currentUser = useContext(UserContext);

    const { onReload: onReloadGroupInvitations } = useSearch("GroupInvitation", {
      groupId
    });

    return (
      <DialogContent title="フォロワーを招待" onClose={onClose}>
        <GroupContext.Provider value={groupId}>
          <ToggleGroupInvitationList
            initialParams={{
              targetId: currentUser.id
            }}
            onReload={onReloadGroupInvitations}
          />
        </GroupContext.Provider>
      </DialogContent>
    );
  })
);
