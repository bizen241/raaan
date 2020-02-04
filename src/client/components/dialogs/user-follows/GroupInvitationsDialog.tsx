import React from "react";
import { createDialog } from "../../../enhancers/createDialog";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useSearch } from "../../../hooks/useSearch";
import { FollowerContext, ToggleGroupInvitationList } from "../../lists/group-summaries/ToggleGroupInvitationList";

export const GroupInvitationsDialog = createDialog<{
  followerId: string;
}>()(
  React.memo(({ t }) => t("グループへの招待")),
  React.memo(({ followerId }) => {
    const currentUser = useCurrentUser();

    const { onReload: onReloadGroupInvitations } = useSearch("GroupInvitation", {
      targetId: followerId,
      ownerId: currentUser.id
    });

    return (
      <>
        <FollowerContext.Provider value={followerId}>
          <ToggleGroupInvitationList
            initialParams={{
              ownerId: currentUser.id
            }}
            onReload={onReloadGroupInvitations}
          />
        </FollowerContext.Provider>
      </>
    );
  })
);
