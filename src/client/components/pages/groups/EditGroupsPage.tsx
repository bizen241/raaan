import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { GroupBufferList } from "../../lists/groups/GroupBufferList";

export const EditGroupsPage = createPage()(
  React.memo(({ t }) => t("未保存のグループ")),
  React.memo(() => {
    return <GroupBufferList />;
  })
);
