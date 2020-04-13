import React from "react";
import { EntityId } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useSearch } from "../../../hooks/useSearch";
import { ToggleGroupInvitationList } from "../../lists/user-follows/ToggleGroupInvitationList";

export const GroupInvitationsDialog = createDialog<{
  groupId: EntityId<"Group">;
}>()(
  React.memo(({ t }) => t("フォロワーを招待")),
  React.memo(({ groupId }) => {
    const { currentUser } = useCurrentUser();

    const { onReload: onReloadGroupInvitations } = useSearch("GroupInvitation", {
      groupId,
    });

    return (
      <ToggleGroupInvitationList
        initialParams={{
          targetId: currentUser.id,
        }}
        groupId={groupId}
        onReload={onReloadGroupInvitations}
      />
    );
  })
);
