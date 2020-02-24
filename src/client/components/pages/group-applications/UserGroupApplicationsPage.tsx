import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { UserGroupApplicationList } from "../../lists/group-applications/UserGroupApplicationList";

export const UserGroupApplicationsPage = createPage<"User">()(
  React.memo(({ t }) => t("自分の申請一覧")),
  React.memo(({ entityId: userId }) => {
    return (
      <UserGroupApplicationList
        initialParams={{
          applicantId: userId
        }}
      />
    );
  })
);
