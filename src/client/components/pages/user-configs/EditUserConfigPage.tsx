import React from "react";
import { useSelector } from "react-redux";
import { createPage } from "../../../enhancers/createPage";
import { RootState } from "../../../reducers";
import { UserConfigEditor } from "../../editors/UserConfigEditor";

export const EditUserConfigPage = createPage()(
  React.memo(({ t }) => t("設定")),
  React.memo(() => {
    const currentUserConfigId = useSelector((state: RootState) => state.app.userConfigId);

    return <UserConfigEditor bufferId={currentUserConfigId} />;
  })
);
