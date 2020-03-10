import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { PlaylistDiaryGraph } from "../../graphs/PlaylistDiaryGraph";

export const PlaylistDiaryPage = createPage<"Playlist">()(
  React.memo(({ t }) => t("プレイリストの記録")),
  React.memo(({ entityId: playlistId }) => {
    return (
      <PlaylistDiaryGraph
        params={{
          targetId: playlistId
        }}
      />
    );
  })
);
