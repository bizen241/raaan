import React, { useContext } from "react";
import { createDialog } from "../../../enhancers/createDialog";
import { useSearch } from "../../../hooks/useSearch";
import { FollowerContext, ToggleGroupInvitationList } from "../../lists/group-summaries/ToggleGroupInvitationList";
import { UserContext } from "../../project/Context";

export const GroupInvitationsDialog = createDialog<{
  followerId: string;
}>()(
  React.memo(({ t }) => t("グループへの招待")),
  React.memo(({ followerId }) => {
    const currentUser = useContext(UserContext);

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
