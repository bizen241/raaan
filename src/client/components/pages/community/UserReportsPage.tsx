import { Inbox, Send } from "@material-ui/icons";
import * as React from "react";
import { PageProps } from "../../project/Router";
import { Button, Page } from "../../ui";

export const UserReportsPage = React.memo<PageProps>(props => {
  const userId = props.match.params.id;

  return (
    <Page title="ユーザーの報告">
      <Button icon={<Send />} label="送信した報告" to={`/users/${userId}/reports/uploaded`} />
      <Button icon={<Inbox />} label="受信した報告" to={`/users/${userId}/reports/received`} />
    </Page>
  );
});
