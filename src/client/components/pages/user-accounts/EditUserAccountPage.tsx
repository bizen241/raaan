import React from "react";
import { useSelector } from "react-redux";
import { createPage } from "../../../enhancers/createPage";
import { RootState } from "../../../reducers";
import { UserAccountEditor } from "../../editors/UserAccountEditor";

export const EditUserAccountPage = createPage()(
  React.memo(({ t }) => t("アバターの設定")),
  React.memo(() => {
    const currentUserAccountId = useSelector((state: RootState) => state.app.userAccountId);

    return <UserAccountEditor bufferId={currentUserAccountId} />;
  })
);
