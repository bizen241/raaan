import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { GroupEditor } from "../../editors/GroupEditor";

export const EditGroupPage = createPage<"Group">()(
  React.memo(({ t }) => t("グループを編集中")),
  React.memo(({ entityId: groupId }) => {
    return <GroupEditor groupId={groupId} />;
  })
);
