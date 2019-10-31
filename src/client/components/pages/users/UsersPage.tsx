import * as React from "react";
import { UserSummaryList } from "../../list/user-summaries/UserSummaryList";
import { Page } from "../../ui";

export const UsersPage = React.memo(() => {
  return (
    <Page title="ユーザーを探す">
      <UserSummaryList
        initialParams={{
          searchLimit: 10,
          searchOffset: 0,
          searchSort: "createdAt",
          searchOrder: "DESC"
        }}
      />
    </Page>
  );
});
