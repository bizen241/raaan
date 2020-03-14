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
    const { currentUser } = useCurrentUser();

    const { onReload: onReloadGroupInvitations } = useSearch("GroupInvitation", {
      targetId: followerId,
      ownerId: currentUser.id
    });

    return (
      <ToggleGroupInvitationList
        initialParams={{
          ownerId: currentUser.id
        }}
        followerId={followerId}
        onReload={onReloadGroupInvitations}
      />
    );
  })
);
