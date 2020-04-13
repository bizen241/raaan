import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { GroupGroupApplicationList } from "../../lists/group-applications/GroupGroupApplicationList";

export const GroupGroupApplicationsPage = createPage<"Group">()(
  React.memo(({ t }) => t("申請一覧")),
  React.memo(({ entityId: groupId }) => {
    return (
      <GroupGroupApplicationList
        initialParams={{
          groupId,
        }}
      />
    );
  })
);
