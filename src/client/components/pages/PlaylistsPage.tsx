import { Box, Button, Typography } from "@material-ui/core";
import { Keyboard } from "@material-ui/icons";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { PlaylistSummaryList } from "../list/PlaylistSummaryList";
import { PageProps } from "../project/Router";
import { Page } from "../ui/Page";
import { useStyles } from "../ui/styles";

export const PlaylistsPage = React.memo<PageProps>(() => {
  const classes = useStyles();

  return (
    <Page title="プレイリストを探す">
      <Box display="flex" flexDirection="column" pb={1}>
        <Button
          className={classes.largeButton}
          variant="contained"
          color="primary"
          component={RouterLink}
          to={`/playlists`}
        >
          <Keyboard className={classes.leftIcon} />
          <Typography>クイズを探す</Typography>
        </Button>
      </Box>
      <Box display="flex" flexDirection="column" pb={1}>
        <PlaylistSummaryList />
      </Box>
    </Page>
  );
});
