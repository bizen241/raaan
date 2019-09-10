import { Box, Button, Typography } from "@material-ui/core";
import { Person } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { PlaylistSummaryList } from "../list/search/PlaylistSummaryList";
import { UserContext } from "../project/Context";
import { PageProps } from "../project/Router";
import { useStyles } from "../ui/styles";
import { Page } from "./Page";

export const PlaylistsPage = React.memo<PageProps>(() => {
  const classes = useStyles();
  const currentUser = useContext(UserContext);

  const isGuest = currentUser.permission === "Guest";

  return (
    <Page title="プレイリスト">
      {!isGuest && (
        <Box display="flex" flexDirection="column" pb={1}>
          <Button
            className={classes.largeButton}
            variant="contained"
            component={RouterLink}
            to={`/users/${currentUser.id}/playlists`}
          >
            <Person className={classes.leftIcon} />
            <Typography>自分のプレイリスト</Typography>
          </Button>
        </Box>
      )}
      <Box display="flex" flexDirection="column" pb={1}>
        <PlaylistSummaryList />
      </Box>
    </Page>
  );
});
