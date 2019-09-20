import { Box, Button, Divider, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import { AccountCircle, Edit } from "@material-ui/icons";
import * as React from "react";
import { useContext, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ExerciseSummaryList } from "../list/ExerciseSummaryList";
import { PlaylistSummaryList } from "../list/PlaylistSummaryList";
import { UserContext } from "../project/Context";
import { Page } from "../ui/Page";
import { useStyles } from "../ui/styles";

export const HomePage = React.memo(() => {
  const classes = useStyles();
  const currentUser = useContext(UserContext);

  const [tab, setTab] = useState<"exercises" | "playlists">("exercises");

  const isGuest = currentUser.permission === "Guest";

  return (
    <Page title="ホーム">
      {isGuest && (
        <Box display="flex" flexDirection="column" pb={1}>
          <Button
            className={classes.largeButton}
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/account"
          >
            <AccountCircle className={classes.leftIcon} />
            <Typography>ログイン</Typography>
          </Button>
        </Box>
      )}
      {!isGuest && (
        <Box display="flex" flexDirection="column" pb={1}>
          <Button
            className={classes.largeButton}
            variant="contained"
            color="secondary"
            component={RouterLink}
            to={`/users/${currentUser.id}`}
          >
            <AccountCircle className={classes.leftIcon} />
            <Typography>マイページ</Typography>
          </Button>
        </Box>
      )}
      <Box display="flex" flexDirection="column" pb={1}>
        <Button className={classes.largeButton} variant="contained" component={RouterLink} to="/exercises/edit">
          <Edit className={classes.leftIcon} />
          <Typography>クイズを作る</Typography>
        </Button>
      </Box>
      <Box display="flex" flexDirection="column" pb={1}>
        <Paper>
          <Tabs value={tab} variant="fullWidth" indicatorColor="primary" onChange={(_, value) => setTab(value)}>
            <Tab value="exercises" label={<Typography>クイズ</Typography>} />
            <Tab value="playlists" label={<Typography>プレイリスト</Typography>} />
          </Tabs>
          <Divider />
          {tab === "exercises" ? <ExerciseSummaryList elevation={0} /> : <PlaylistSummaryList elevation={0} />}
        </Paper>
      </Box>
    </Page>
  );
});
