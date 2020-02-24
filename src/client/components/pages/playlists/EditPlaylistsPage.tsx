import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { PlaylistBufferList } from "../../lists/playlists/PlaylistBufferList";

export const EditPlaylistsPage = createPage()(
  React.memo(({ t }) => t("未保存のプレイリスト")),
  React.memo(() => {
    return <PlaylistBufferList />;
  })
);
