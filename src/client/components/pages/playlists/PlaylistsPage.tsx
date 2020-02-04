import { Bookmarks, Person } from "@material-ui/icons";
import React from "react";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { PlaylistSummaryList } from "../../lists/playlist-summaries/PlaylistSummaryList";
import { Page } from "../../project/Page";
import { Button } from "../../ui";

export const PlaylistsPage = React.memo(() => {
  const currentUser = useCurrentUser();

  return (
    <Page title="プレイリストを探す">
      <Button icon={<Person />} label="自分のプレイリスト" to={`/users/${currentUser.id}/playlists`} />
      <Button icon={<Bookmarks />} label="ブックマーク" to={`/users/${currentUser.id}/bookmarks`} />
      <PlaylistSummaryList
        initialParams={{
          searchLimit: 10,
          searchOffset: 0,
          searchSort: "createdAt",
          searchOrder: "DESC"
        }}
      />
    </Page>
  );
});
