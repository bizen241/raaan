import React from "react";
import { PlaylistEditor } from "../../editors/PlaylistEditor";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";

const EditPlaylistPage = React.memo<PageProps>(({ match }) => {
  const playlistId = match.params.id;

  return (
    <Page title="プレイリストを編集中">
      <PlaylistEditor bufferId={playlistId} />
    </Page>
  );
});

export default EditPlaylistPage;
