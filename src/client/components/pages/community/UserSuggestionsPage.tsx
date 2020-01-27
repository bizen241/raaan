import { Edit, Inbox, Send } from "@material-ui/icons";
import React, { useContext } from "react";
import { UserContext } from "../../project/Context";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";
import { Button } from "../../ui";

export const UserSuggestionsPage = React.memo<PageProps>(props => {
  const userId = props.match.params.id;

  const currentUser = useContext(UserContext);

  const isOwn = userId === currentUser.id;

  return (
    <Page title="提案履歴">
      {isOwn && <Button icon={<Edit />} label="編集中の提案" to={`/suggestions/edit`} />}
      <Button icon={<Send />} label="送信した提案" to={`/users/${userId}/suggestions/uploaded`} />
      <Button icon={<Inbox />} label="受信した提案" to={`/users/${userId}/suggestions/received`} />
    </Page>
  );
});
