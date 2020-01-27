import React from "react";
import { PlaylistBookmarkList } from "../../lists/playlist-bookmarks/PlaylistBookmarkList";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";

export const UserPlaylistBookmarksPage = React.memo<PageProps>(props => {
  const userId = props.match.params.id;

  return (
    <Page title="ブックマーク">
      <PlaylistBookmarkList
        initialParams={{
          userId
        }}
      />
    </Page>
  );
});
