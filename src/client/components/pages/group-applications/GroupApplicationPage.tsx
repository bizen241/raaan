import React from "react";
import { GroupApplicationEditor } from "../../editors/GroupApplicationEditor";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";

export const GroupApplicationPage = React.memo<PageProps>(props => {
  const groupId = props.match.params.id;
  const secret = props.match.params.secret;

  return (
    <Page title="グループへの参加を申請">
      <GroupApplicationEditor
        params={{
          groupId,
          value: secret
        }}
      />
    </Page>
  );
});
