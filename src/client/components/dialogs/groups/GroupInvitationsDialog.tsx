import React, { useContext } from "react";
import { createDialog } from "../../../enhancers/createDialog";
import { useSearch } from "../../../hooks/useSearch";
import { GroupContext, ToggleGroupInvitationList } from "../../lists/user-follows/ToggleGroupInvitationList";
import { UserContext } from "../../project/Context";

export const GroupInvitationsDialog = createDialog<{
  groupId: string;
}>()(
  React.memo(({ t }) => t("フォロワーを招待")),
  React.memo(({ groupId }) => {
    const currentUser = useContext(UserContext);

    const { onReload: onReloadGroupInvitations } = useSearch("GroupInvitation", {
      groupId
    });

    return (
      <>
        <GroupContext.Provider value={groupId}>
          <ToggleGroupInvitationList
            initialParams={{
              targetId: currentUser.id
            }}
            onReload={onReloadGroupInvitations}
          />
        </GroupContext.Provider>
      </>
    );
  })
);
