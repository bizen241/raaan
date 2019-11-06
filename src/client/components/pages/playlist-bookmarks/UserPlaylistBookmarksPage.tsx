import * as React from "react";
import { PlaylistBookmarkList } from "../../list/playlist-bookmarks/PlaylistBookmarkList";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui";

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
