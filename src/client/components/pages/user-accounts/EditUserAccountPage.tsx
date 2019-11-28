import * as React from "react";
import { useSelector } from "react-redux";
import { UserAccount } from "../../../../shared/api/entities";
import { useEntity } from "../../../hooks/useEntity";
import { RootState } from "../../../reducers";
import { Button, Page } from "../../ui";

export const EditUserAccountPage = React.memo(() => {
  const currentUserAccountId = useSelector((state: RootState) => state.app.userAccountId);
  const { entity: currentUserAccount } = useEntity<UserAccount>("UserAccount", currentUserAccountId);
  if (currentUserAccount === undefined) {
    return null;
  }

  const { provider } = currentUserAccount;

  return (
    <Page title="プロバイダの変更">
      {provider === "github" && <Button label="GitHubアカウントに変更" href="/auth/github" />}
    </Page>
  );
});
