import { Keyboard } from "@material-ui/icons";
import * as React from "react";
import { PlaylistSummaryList } from "../../list/PlaylistSummaryList";
import { Button, Page } from "../../ui";

export const PlaylistsPage = React.memo(() => {
  return (
    <Page title="プレイリストを探す">
      <Button icon={<Keyboard />} label="クイズを探す" to="/exercises" />
      <PlaylistSummaryList
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
