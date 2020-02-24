import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { PlaylistViewer } from "../../viewers/PlaylistViewer";

export const PlaylistPage = createPage<"Playlist">()(
  React.memo(({ t }) => t("プレイリストの詳細")),
  React.memo(({ entityId: playlistId }) => {
    return <PlaylistViewer playlistId={playlistId} />;
  })
);
