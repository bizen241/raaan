import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { PlaylistBookmarkList } from "../../lists/playlist-bookmarks/PlaylistBookmarkList";

export const UserPlaylistBookmarksPage = createPage<"User">()(
  React.memo(({ t }) => t("ブックマーク")),
  React.memo(({ entityId: userId }) => {
    return (
      <PlaylistBookmarkList
        initialParams={{
          userId
        }}
      />
    );
  })
);
