import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { useEntity } from "../../../hooks/useEntity";
import { GroupSecretViewer } from "../../viewers/GroupSecretViewer";

export const GroupSecretPage = createPage<"Group">()(
  React.memo(({ t }) => t("リンクで招待")),
  React.memo(({ entityId: groupId }) => {
    const { entity: group } = useEntity("Group", groupId);

    return <GroupSecretViewer groupSecretId={group.secretId} />;
  })
);
