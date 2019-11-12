import * as React from "react";
import { useContext } from "react";
import { GroupInvitation } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { useSearch } from "../../../hooks/useSearch";
import { ToggleGroupInvitationList } from "../../list/group-summaries/ToggleGroupInvitationList";
import { UserContext } from "../../project/Context";
import { DialogContent } from "../../ui";

export const GroupInvitationsDialog = createDialog<{
  followerId: string;
}>(
  React.memo(({ followerId, onClose }) => {
    const currentUser = useContext(UserContext);

    const { entities: groupInvitations, onReload: onReloadGroupInvitations } = useSearch<GroupInvitation>(
      "GroupInvitation",
      {
        targetId: followerId,
        ownerId: currentUser.id
      }
    );

    return (
      <DialogContent title="フォロワーを招待" onClose={onClose}>
        <ToggleGroupInvitationList
          initialParams={{
            ownerId: currentUser.id
          }}
          followerId={followerId}
          followerInvitations={groupInvitations}
          onReload={onReloadGroupInvitations}
        />
      </DialogContent>
    );
  })
);
