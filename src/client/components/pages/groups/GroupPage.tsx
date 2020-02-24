import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { GroupViewer } from "../../viewers/GroupViewer";

export const GroupPage = createPage<"Group">()(
  React.memo(({ t }) => t("グループの詳細")),
  React.memo(({ entityId: groupId }) => {
    return <GroupViewer entityId={groupId} />;
  })
);
