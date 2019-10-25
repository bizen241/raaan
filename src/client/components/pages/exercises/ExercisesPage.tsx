import { PlaylistPlay } from "@material-ui/icons";
import * as React from "react";
import { ExerciseSummaryList } from "../../list/ExerciseSummaryList";
import { Button, Page } from "../../ui";

export const ExercisesPage = React.memo(() => {
  return (
    <Page title="クイズを探す">
      <Button icon={<PlaylistPlay />} label="プレイリストを探す" to="/playlists" />
      <ExerciseSummaryList
        initialParams={{
          searchLimit: 10,
          searchOffset: 0,
          searchSort: "createdAt",
          searchOrder: "DESC"
        }}
      />
    </Page>
  );
});
