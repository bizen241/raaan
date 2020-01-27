import { Bookmarks, Person } from "@material-ui/icons";
import React, { useContext } from "react";
import { PlaylistSummaryList } from "../../lists/playlist-summaries/PlaylistSummaryList";
import { UserContext } from "../../project/Context";
import { Page } from "../../project/Page";
import { Button } from "../../ui";

export const PlaylistsPage = React.memo(() => {
  const currentUser = useContext(UserContext);

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
