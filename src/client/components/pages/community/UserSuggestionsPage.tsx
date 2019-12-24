import { Inbox, Send } from "@material-ui/icons";
import * as React from "react";
import { PageProps } from "../../project/Router";
import { Button, Page } from "../../ui";

export const UserSuggestionsPage = React.memo<PageProps>(props => {
  const userId = props.match.params.id;

  return (
    <Page title="提案履歴">
      <Button icon={<Send />} label="送信した提案" to={`/users/${userId}/suggestions/uploaded`} />
      <Button icon={<Inbox />} label="受信した提案" to={`/users/${userId}/suggestions/received`} />
    </Page>
  );
});
