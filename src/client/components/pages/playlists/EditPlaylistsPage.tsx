import React from "react";
import { PlaylistBufferList } from "../../list/playlists/PlaylistBufferList";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui/Page";

export const EditPlaylistsPage = React.memo<PageProps>(() => {
  return (
    <Page title="未保存のプレイリスト">
      <PlaylistBufferList />
    </Page>
  );
});
