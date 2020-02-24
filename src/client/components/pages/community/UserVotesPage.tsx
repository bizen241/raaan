import { ThumbDown, ThumbUp } from "@material-ui/icons";
import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { Button } from "../../ui";

export const UserVotesPage = createPage()(
  React.memo(({ t }) => t("評価履歴")),
  React.memo(({ entityId: userId }) => {
    return (
      <>
        <Button icon={<ThumbUp />} label="高評価" to={`/users/${userId}/votes/up`} />
        <Button icon={<ThumbDown />} label="低評価" to={`/users/${userId}/votes/down`} />
      </>
    );
  })
);
