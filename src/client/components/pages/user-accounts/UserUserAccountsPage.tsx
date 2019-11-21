import * as React from "react";
import { useContext } from "react";
import { UserAccountList } from "../../list/user-accounts/UserAccountList";
import { UserContext } from "../../project/Context";
import { Page } from "../../ui/Page";

export const UserUserAccountsPage = () => {
  const currentUser = useContext(UserContext);

  return (
    <Page title="プロバイダ一覧">
      <UserAccountList
        initialParams={{
          userId: currentUser.id
        }}
      />
    </Page>
  );
};
