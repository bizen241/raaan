import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import { UserConfigEditor } from "../../editor/UserConfigEditor";
import { Page } from "../../ui/Page";

export const EditUserConfigPage = React.memo(() => {
  const currentUserConfigId = useSelector((state: RootState) => state.app.userConfigId);

  return (
    <Page title="設定">
      <UserConfigEditor bufferId={currentUserConfigId} />
    </Page>
  );
});
