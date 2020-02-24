import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { PlaylistEditor } from "../../editors/PlaylistEditor";

const EditPlaylistPage = createPage<"Playlist">()(
  React.memo(({ t }) => t("プレイリストを編集中")),
  React.memo(({ entityId: playlistId }) => {
    return <PlaylistEditor bufferId={playlistId} />;
  })
);

export default EditPlaylistPage;
