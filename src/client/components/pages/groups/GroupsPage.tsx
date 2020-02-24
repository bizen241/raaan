import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { GroupSummaryList } from "../../lists/group-summaries/GroupSummaryList";

export const GroupsPage = createPage()(
  React.memo(({ t }) => t("グループを探す")),
  React.memo(() => {
    return <GroupSummaryList initialParams={{}} />;
  })
);
