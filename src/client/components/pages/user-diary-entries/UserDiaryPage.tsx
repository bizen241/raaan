import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { UserDiaryGraph } from "../../graphs/UserDiaryGraph";

export const UserDiaryPage = createPage<"User">()(
  React.memo(({ t }) => t("ユーザーの記録")),
  React.memo(({ entityId: userId }) => {
    return (
      <UserDiaryGraph
        params={{
          targetId: userId,
        }}
      />
    );
  })
);
