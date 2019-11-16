import * as React from "react";
import { ContestList } from "../../list/contests/ContestList";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui/Page";

export const GroupContestsPage = React.memo<PageProps>(({ match }) => {
  const groupId = match.params.id;

  return (
    <Page title="セッション一覧">
      <ContestList
        initialParams={{
          groupId
        }}
      />
    </Page>
  );
});
