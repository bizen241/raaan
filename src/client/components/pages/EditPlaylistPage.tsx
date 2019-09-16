import * as React from "react";
import { PlaylistEditor } from "../editor/PlaylistEditor";
import { PageProps } from "../project/Router";
import { Page } from "./Page";

const EditPlaylistPage = React.memo<PageProps>(({ match }) => {
  const playlistId = match.params.id;

  return (
    <Page>
      <PlaylistEditor entityId={playlistId} />
    </Page>
  );
});

export default EditPlaylistPage;
