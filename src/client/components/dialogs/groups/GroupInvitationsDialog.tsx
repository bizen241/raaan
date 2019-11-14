import * as React from "react";
import { useContext } from "react";
import { GroupInvitation } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { useSearch } from "../../../hooks/useSearch";
import { GroupContext, ToggleGroupInvitationList } from "../../list/user-follows/ToggleGroupInvitationList";
import { UserContext } from "../../project/Context";
import { Button, DialogContent } from "../../ui";

export const GroupInvitationsDialog = createDialog<{
  groupId: string;
}>(
  React.memo(({ groupId, onClose }) => {
    const currentUser = useContext(UserContext);

    const { onReload: onReloadGroupInvitations } = useSearch<GroupInvitation>("GroupInvitation", {
      groupId
    });

    return (
      <DialogContent title="フォロワーを招待" onClose={onClose}>
        <Button label="リンク" />
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
