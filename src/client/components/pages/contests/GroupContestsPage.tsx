import { Add, Edit } from "@material-ui/icons";
import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { ContestList } from "../../lists/contests/ContestList";
import { Button } from "../../ui";

export const GroupContestsPage = createPage<"Group">()(
  React.memo(({ t }) => t("グループのセッション")),
  React.memo(({ entityId: groupId }) => {
    return (
      <>
        <Button icon={<Add />} label="新しいセッションを作る" />
        <Button icon={<Edit />} label="編集中のセッション" to="/contests/edit" />
        <ContestList
          initialParams={{
            groupId
          }}
        />
      </>
    );
  })
);
