import React from "react";
import { useEntity } from "../../../hooks/useEntity";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui";
import { GroupSecretViewer } from "../../viewer/GroupSecretViewer";

export const GroupSecretPage = React.memo<PageProps>(props => {
  const groupId = props.match.params.id;

  const { entity: group } = useEntity("Group", groupId);

  return <Page title="リンクで招待">{group !== undefined && <GroupSecretViewer entityId={group.secretId} />}</Page>;
});
