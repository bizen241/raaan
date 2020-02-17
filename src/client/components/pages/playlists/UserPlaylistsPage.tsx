import { Bookmarks, Edit } from "@material-ui/icons";
import React from "react";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { PlaylistSummaryList } from "../../lists/playlist-summaries/PlaylistSummaryList";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";
import { Button, Column } from "../../ui";

export const UserPlaylistsPage = React.memo<PageProps>(({ match }) => {
  const userId = match.params.id;

  const { currentUserId } = useCurrentUser();

  const isOwn = userId === currentUserId;

  return (
    <Page title={userId === currentUserId ? "自分のプレイリスト" : "ユーザーのプレイリスト"}>
      {isOwn && <Button icon={<Edit />} label="編集中のプレイリスト" to={`/playlists/edit`} />}
      {isOwn && <Button icon={<Bookmarks />} label="ブックマーク" to={`/users/${userId}/bookmarks`} />}
      <Column pb={1}>
        <PlaylistSummaryList initialParams={{ authorId: userId }} />
      </Column>
    </Page>
  );
});
