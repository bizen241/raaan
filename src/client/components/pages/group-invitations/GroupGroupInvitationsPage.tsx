import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { GroupGroupInvitationList } from "../../lists/group-invitations/GroupGroupInvitationList";

export const GroupGroupInvitationsPage = createPage<"Group">()(
  React.memo(({ t }) => t("招待一覧")),
  React.memo(({ entityId: groupId }) => {
    return (
      <GroupGroupInvitationList
        initialParams={{
          groupId
        }}
      />
    );
  })
);
