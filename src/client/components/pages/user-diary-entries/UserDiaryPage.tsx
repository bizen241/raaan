import React from "react";
import { UserDiaryGraph } from "../../graphs/UserDiaryGraph";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";

export const UserDiaryPage = React.memo<PageProps>(props => {
  const userId = props.match.params.id;

  return (
    <Page title="ユーザーの記録">
      <UserDiaryGraph entityId={userId} />
    </Page>
  );
});
