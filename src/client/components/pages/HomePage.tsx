import { AccountCircle, Keyboard, LocalOffer, PlaylistPlay, Timeline } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { UserDiaryGraph } from "../graphs/UserDiaryGraph";
import { UserContext } from "../project/Context";
import { Button, Card, Page } from "../ui";

export const HomePage = React.memo(() => {
  const currentUser = useContext(UserContext);

  const isGuest = currentUser.permission === "Guest";

  return (
    <Page title="ホーム">
      {isGuest ? (
        <Button color="primary" icon={<AccountCircle />} label="ログイン" to="/user/account" />
      ) : (
        <Button color="primary" icon={<AccountCircle />} label="マイページ" to={`/users/${currentUser.id}`} />
      )}
      <Button icon={<Keyboard />} label="問題集" to="/exercises" />
      <Button icon={<PlaylistPlay />} label="プレイリスト" to="/playlists" />
      <Button icon={<LocalOffer />} label="タグ" to="/tags" />
      <Card icon={<Timeline />} title="活動記録">
        <UserDiaryGraph entityId={currentUser.id} />
      </Card>
    </Page>
  );
});
