import React from "react";
import { EntityId } from "../../../../shared/api/entities";
import { PlaylistBookmarkList } from "../../lists/playlist-bookmarks/PlaylistBookmarkList";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";

export const UserPlaylistBookmarksPage = React.memo<PageProps>(props => {
  const userId = props.match.params.id as EntityId<"User">;

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
