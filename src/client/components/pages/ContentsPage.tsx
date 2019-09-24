import { Divider, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import * as React from "react";
import { useState } from "react";
import { ExerciseSummaryList } from "../list/ExerciseSummaryList";
import { PlaylistSummaryList } from "../list/PlaylistSummaryList";
import { Page } from "../ui";

export const ContentsPage = React.memo(() => {
  const [tab, setTab] = useState<"exercises" | "playlists">("exercises");

  return (
    <Page title="クイズを探す">
      <Paper>
        <Tabs value={tab} variant="fullWidth" indicatorColor="primary" onChange={(_, value) => setTab(value)}>
          <Tab value="exercises" label={<Typography>クイズ</Typography>} />
          <Tab value="playlists" label={<Typography>プレイリスト</Typography>} />
        </Tabs>
        <Divider />
        {tab === "exercises" ? <ExerciseSummaryList elevation={0} /> : <PlaylistSummaryList elevation={0} />}
      </Paper>
    </Page>
  );
});
