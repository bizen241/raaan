import { Keyboard, Person, PlaylistPlay } from "@material-ui/icons";
import * as React from "react";
import { Button, Page } from "../../ui";

export const ObjectionsPage = React.memo(() => {
  return (
    <Page title="異議履歴">
      <Button icon={<Person />} label="ユーザーの異議" to="/user-objections" />
      <Button icon={<Keyboard />} label="クイズの異議" to="/exercise-objections" />
      <Button icon={<PlaylistPlay />} label="プレイリストの異議" to="/playlist-objections" />
    </Page>
  );
});
