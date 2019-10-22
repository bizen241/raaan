import { Divider, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import { useContext, useMemo, useState } from "react";
import * as React from "react";
import { ExerciseSummaryList } from "../../list/ExerciseSummaryList";
import { PlaylistSummaryList } from "../../list/PlaylistSummaryList";
import { UserContext } from "../../project/Context";
import { PageProps } from "../../project/Router";
import { Column } from "../../ui";
import { Page } from "../../ui/Page";

export const UserContentsPage = React.memo<PageProps>(({ match }) => {
  const userId = match.params.id;

  const currentUser = useContext(UserContext);

  const [tab, setTab] = useState<"exercises" | "playlists">("exercises");
  const initialParams = useMemo(() => ({ authorId: userId }), []);

  return (
    <Page title={userId === currentUser.id ? "自分のコンテンツ" : "ユーザーのコンテンツ"}>
      <Column pb={1}>
        <Paper>
          <Tabs value={tab} variant="fullWidth" indicatorColor="primary" onChange={(_, value) => setTab(value)}>
            <Tab value="exercises" label={<Typography>クイズ</Typography>} />
            <Tab value="playlists" label={<Typography>プレイリスト</Typography>} />
          </Tabs>
          <Divider />
          {tab === "exercises" ? (
            <ExerciseSummaryList initialParams={initialParams} elevation={0} />
          ) : (
            <PlaylistSummaryList initialParams={initialParams} elevation={0} />
          )}
        </Paper>
      </Column>
    </Page>
  );
});
