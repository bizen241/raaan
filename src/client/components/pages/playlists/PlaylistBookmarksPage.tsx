import * as React from "react";
import { useContext } from "react";
import { PlaylistBookmarkList } from "../../list/PlaylistBookmarkList";
import { UserContext } from "../../project/Context";
import { Page } from "../../ui";

export const PlaylistBookmarksPage = React.memo(() => {
  const currentUser = useContext(UserContext);

  return (
    <Page title="ブックマーク">
      <PlaylistBookmarkList
        initialParams={{
          userId: currentUser.id
        }}
      />
    </Page>
  );
});
