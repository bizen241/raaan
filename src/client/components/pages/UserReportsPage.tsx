import { Keyboard, Person, PlaylistPlay } from "@material-ui/icons";
import * as React from "react";
import { PageProps } from "../project/Router";
import { Button, Page } from "../ui";

export const UserReportsPage = React.memo<PageProps>(props => {
  const userId = props.match.params.id;

  return (
    <Page title="報告履歴">
      <Button icon={<Person />} label="ユーザーの報告" to={`/users/${userId}/user-reports`} />
      <Button icon={<Keyboard />} label="クイズの報告" to={`/users/${userId}/exercise-reports`} />
      <Button icon={<PlaylistPlay />} label="プレイリストの報告" to={`/users/${userId}/playlist-reports`} />
    </Page>
  );
});
