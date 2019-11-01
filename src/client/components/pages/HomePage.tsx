import { Divider } from "@material-ui/core";
import { AccountCircle, ContactMail, Keyboard, Label, PlaylistPlay, Timeline } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { UserDiaryGraph } from "../graphs/UserDiaryGraph";
import { UserContext } from "../project/Context";
import { Button, Card, Column, Page } from "../ui";

export const HomePage = React.memo(() => {
  const currentUser = useContext(UserContext);

  const isGuest = currentUser.permission === "Guest";

  return (
    <Page title="ホーム">
      {isGuest ? (
        <Button color="primary" icon={<AccountCircle />} label="ログイン" to="/user/user-accounts" />
      ) : (
        <Button color="primary" icon={<AccountCircle />} label="マイページ" to={`/users/${currentUser.id}`} />
      )}
      <Column pb={1}>
        <Divider />
      </Column>
      <Button icon={<Keyboard />} label="クイズ" to="/exercises" />
      <Button icon={<PlaylistPlay />} label="プレイリスト" to="/playlists" />
      <Column pb={1}>
        <Divider />
      </Column>
      <Button icon={<Label />} label="タグ" to="/tags" />
      <Button icon={<ContactMail />} label="コミュニティ" to="/community" />
      <Column pb={1}>
        <Divider />
      </Column>
      <Card icon={<Timeline />} title="活動記録">
        <UserDiaryGraph entityId={currentUser.id} />
      </Card>
    </Page>
  );
});
