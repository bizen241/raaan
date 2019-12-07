import * as React from "react";
import { GroupApplicationEditor } from "../../editor/GroupApplicationEditor";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui/Page";

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
