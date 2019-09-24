import { Button, Divider, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import { Bookmarks } from "@material-ui/icons";
import { useContext, useMemo, useState } from "react";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { ExerciseSummaryList } from "../list/ExerciseSummaryList";
import { PlaylistSummaryList } from "../list/PlaylistSummaryList";
import { UserContext } from "../project/Context";
import { PageProps } from "../project/Router";
import { Column } from "../ui";
import { Page } from "../ui/Page";
import { useStyles } from "../ui/styles";

export const UserContentsPage = React.memo<PageProps>(({ match }) => {
  const userId = match.params.id;

  const classes = useStyles();
  const currentUser = useContext(UserContext);

  const [tab, setTab] = useState<"exercises" | "playlists">("exercises");
  const initialSearchParams = useMemo(() => ({ authorId: userId }), []);

  const isOwn = userId === currentUser.id;

  return (
    <Page title={userId === currentUser.id ? "自分のコンテンツ" : "ユーザーのコンテンツ"}>
      {isOwn && (
        <Column pb={1}>
          <Button className={classes.largeButton} variant="contained" component={RouterLink} to={`/bookmarks`}>
            <Bookmarks className={classes.leftIcon} />
            <Typography>ブックマーク</Typography>
          </Button>
        </Column>
      )}
      <Column pb={1}>
        <Paper>
          <Tabs value={tab} variant="fullWidth" indicatorColor="primary" onChange={(_, value) => setTab(value)}>
            <Tab value="exercises" label={<Typography>クイズ</Typography>} />
            <Tab value="playlists" label={<Typography>プレイリスト</Typography>} />
          </Tabs>
          <Divider />
          {tab === "exercises" ? (
            <ExerciseSummaryList initialSearchParams={initialSearchParams} elevation={0} />
          ) : (
            <PlaylistSummaryList initialSearchParams={initialSearchParams} elevation={0} />
          )}
        </Paper>
      </Column>
    </Page>
  );
});
