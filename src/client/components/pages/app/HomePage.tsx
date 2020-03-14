import { AccountCircle, Keyboard, LocalOffer, PlaylistPlay } from "@material-ui/icons";
import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { UserDiaryGraph } from "../../graphs/UserDiaryGraph";
import { Button } from "../../ui";

export const HomePage = createPage()(
  React.memo(({ t }) => t("pages.HomePage.title")),
  React.memo(() => {
    const { currentUser } = useCurrentUser();

    const isGuest = currentUser.permission === "Guest";

    return (
      <>
        {isGuest ? (
          <Button color="primary" icon={<AccountCircle />} label="ログイン" to="/user/account" />
        ) : (
          <Button color="primary" icon={<AccountCircle />} label="マイページ" to={`/users/${currentUser.id}`} />
        )}
        <Button icon={<Keyboard />} label="問題集" to="/exercises" />
        <Button icon={<PlaylistPlay />} label="プレイリスト" to="/playlists" />
        <Button icon={<LocalOffer />} label="タグ" to="/tags" />
        <UserDiaryGraph
          params={{
            targetId: currentUser.id
          }}
        />
      </>
    );
  })
);
