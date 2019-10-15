import * as React from "react";
import { useContext } from "react";
import { UserConfigEditor } from "../../editor/UserConfigEditor";
import { UserContext } from "../../project/Context";
import { Page } from "../../ui/Page";

export const UserConfigPage = React.memo(() => {
  const currentUser = useContext(UserContext);

  return (
    <Page title="設定">
      <UserConfigEditor bufferId={currentUser.configId} />
    </Page>
  );
});
