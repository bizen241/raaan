import { Inbox, Send } from "@material-ui/icons";
import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { Button } from "../../ui";

export const UserReportsPage = createPage()(
  React.memo(({ t }) => t("ユーザーの報告")),
  React.memo(({ entityId: userId }) => {
    return (
      <>
        <Button icon={<Send />} label="送信した報告" to={`/users/${userId}/reports/uploaded`} />
        <Button icon={<Inbox />} label="受信した報告" to={`/users/${userId}/reports/received`} />
      </>
    );
  })
);
