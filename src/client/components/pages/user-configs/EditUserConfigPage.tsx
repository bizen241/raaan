import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import { UserConfigEditor } from "../../editors/UserConfigEditor";
import { Page } from "../../project/Page";

export const EditUserConfigPage = React.memo(() => {
  const currentUserConfigId = useSelector((state: RootState) => state.app.userConfigId);

  return (
    <Page title="設定">
      <UserConfigEditor bufferId={currentUserConfigId} />
    </Page>
  );
});
