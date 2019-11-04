import { Hearing, Label, Person } from "@material-ui/icons";
import * as React from "react";
import { PageProps } from "../../project/Router";
import { Button, Page } from "../../ui";

export const UserFollowsHomePage = React.memo<PageProps>(props => {
  const userId = props.match.params.id;

  return (
    <Page title="フォロー">
      <Button icon={<Label />} label="フォロー中のタグ" to={`/users/${userId}/tag-follows`} />
      <Button icon={<Person />} label="フォロー中のユーザー" to={`/users/${userId}/user-follows`} />
      <Button icon={<Hearing />} label="フォロワー" to={`/users/${userId}/followers`} />
    </Page>
  );
});
