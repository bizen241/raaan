import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { GroupApplicationEditor } from "../../editors/GroupApplicationEditor";

export const GroupApplicationPage = createPage<"Group">()(
  React.memo(({ t }) => t("グループへの参加を申請")),
  React.memo(({ entityId: groupId, secret }) => {
    return <GroupApplicationEditor groupId={groupId} groupSecretValue={secret} />;
  })
);
