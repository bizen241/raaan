import { Bookmarks, Edit } from "@material-ui/icons";
import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { PlaylistSummaryList } from "../../lists/playlist-summaries/PlaylistSummaryList";
import { Button, Column } from "../../ui";

export const UserPlaylistsPage = createPage<"User">()(
  React.memo(({ entityId: userId, t }) => {
    const { currentUser } = useCurrentUser();
    const isOwn = currentUser.id === userId;

    return isOwn ? t("自分のプレイリスト") : t("ユーザーのプレイリスト");
  }),
  React.memo(({ entityId: userId }) => {
    const { currentUser } = useCurrentUser();
    const isOwn = userId === currentUser.id;

    return (
      <>
        {isOwn && <Button icon={<Edit />} label="編集中のプレイリスト" to={`/playlists/edit`} />}
        {isOwn && <Button icon={<Bookmarks />} label="ブックマーク" to={`/users/${userId}/bookmarks`} />}
        <Column pb={1}>
          <PlaylistSummaryList initialParams={{ authorId: userId }} />
        </Column>
      </>
    );
  })
);
