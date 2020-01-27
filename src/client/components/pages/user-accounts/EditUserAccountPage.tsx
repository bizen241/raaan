import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import { UserAccountEditor } from "../../editors/UserAccountEditor";
import { Page } from "../../project/Page";

export const EditUserAccountPage = React.memo(() => {
  const currentUserAccountId = useSelector((state: RootState) => state.app.userAccountId);

  return (
    <Page title="アバターの設定">
      <UserAccountEditor bufferId={currentUserAccountId} />
    </Page>
  );
});
