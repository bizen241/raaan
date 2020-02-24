import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { UserSummaryList } from "../../lists/user-summaries/UserSummaryList";

export const UsersPage = createPage()(
  React.memo(({ t }) => t("ユーザーを探す")),
  React.memo(() => {
    return (
      <UserSummaryList
        initialParams={{
          searchLimit: 10,
          searchOffset: 0,
          searchOrder: "DESC"
        }}
      />
    );
  })
);
