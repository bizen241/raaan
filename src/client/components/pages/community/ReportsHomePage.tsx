import { Keyboard, Person, PlaylistPlay } from "@material-ui/icons";
import * as React from "react";
import { Button, Page } from "../../ui";

export const ReportsHomePage = React.memo(() => {
  return (
    <Page title="報告履歴">
      <Button icon={<Person />} label="ユーザーの報告" to="/user-reports" />
      <Button icon={<Keyboard />} label="クイズの報告" to="/exercise-reports" />
      <Button icon={<PlaylistPlay />} label="プレイリストの報告" to="/playlist-reports" />
    </Page>
  );
});
