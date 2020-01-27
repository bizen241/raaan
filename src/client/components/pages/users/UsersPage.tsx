import React from "react";
import { UserSummaryList } from "../../lists/user-summaries/UserSummaryList";
import { Page } from "../../project/Page";

export const UsersPage = React.memo(() => {
  return (
    <Page title="ユーザーを探す">
      <UserSummaryList
        initialParams={{
          searchLimit: 10,
          searchOffset: 0,
          searchOrder: "DESC"
        }}
      />
    </Page>
  );
});
