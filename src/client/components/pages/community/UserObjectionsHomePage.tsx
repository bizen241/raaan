import { Keyboard, PlaylistPlay } from "@material-ui/icons";
import * as React from "react";
import { PageProps } from "../../project/Router";
import { Button, Page } from "../../ui";

export const UserObjectionsHomePage = React.memo<PageProps>(props => {
  const userId = props.match.params.id;

  return (
    <Page title="異議履歴">
      <Button icon={<Keyboard />} label="クイズの異議" to={`/users/${userId}/exercise-objections`} />
      <Button icon={<PlaylistPlay />} label="プレイリストの異議" to={`/users/${userId}/playlist-objections`} />
    </Page>
  );
});
