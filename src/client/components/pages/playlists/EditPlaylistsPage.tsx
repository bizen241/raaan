import React from "react";
import { PlaylistBufferList } from "../../lists/playlists/PlaylistBufferList";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";

export const EditPlaylistsPage = React.memo<PageProps>(() => {
  return (
    <Page title="未保存のプレイリスト">
      <PlaylistBufferList />
    </Page>
  );
});
