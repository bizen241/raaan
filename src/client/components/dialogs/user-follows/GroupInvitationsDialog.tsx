import React from "react";
import { EntityId } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useSearch } from "../../../hooks/useSearch";
import { ToggleGroupInvitationList } from "../../lists/group-summaries/ToggleGroupInvitationList";

export const GroupInvitationsDialog = createDialog<{
  followerId: EntityId<"User">;
}>()(
  React.memo(({ t }) => t("グループへの招待")),
  React.memo(({ followerId }) => {
    const { currentUserId } = useCurrentUser();

    const { onReload: onReloadGroupInvitations } = useSearch("GroupInvitation", {
      targetId: followerId,
      ownerId: currentUserId
    });

    return (
      <ToggleGroupInvitationList
        initialParams={{
          ownerId: currentUserId
        }}
        followerId={followerId}
        onReload={onReloadGroupInvitations}
      />
    );
  })
);
