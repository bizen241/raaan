import { AccountCircle, Keyboard, LocalOffer, PlaylistPlay } from "@material-ui/icons";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { UserDiaryGraph } from "../../graphs/UserDiaryGraph";
import { UserContext } from "../../project/Context";
import { Button, Page } from "../../ui";

export const HomePage = React.memo(() => {
  const { t } = useTranslation();
  const currentUser = useContext(UserContext);

  const isGuest = currentUser.permission === "Guest";

  return (
    <Page title={t("pages.HomePage.title")}>
      {isGuest ? (
        <Button color="primary" icon={<AccountCircle />} label="ログイン" to="/user/account" />
      ) : (
        <Button color="primary" icon={<AccountCircle />} label="マイページ" to={`/users/${currentUser.id}`} />
      )}
      <Button icon={<Keyboard />} label="問題集" to="/exercises" />
      <Button icon={<PlaylistPlay />} label="プレイリスト" to="/playlists" />
      <Button icon={<LocalOffer />} label="タグ" to="/tags" />
      <UserDiaryGraph entityId={currentUser.id} />
    </Page>
  );
});
