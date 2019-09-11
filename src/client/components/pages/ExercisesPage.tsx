import { Box, Button, Typography } from "@material-ui/core";
import { PlaylistPlay } from "@material-ui/icons";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { ExerciseSummaryList } from "../list/search/ExerciseSummaryList";
import { PageProps } from "../project/Router";
import { useStyles } from "../ui/styles";
import { Page } from "./Page";

export const ExercisesPage = React.memo<PageProps>(() => {
  const classes = useStyles();

  return (
    <Page title="クイズを探す">
      <Box display="flex" flexDirection="column" pb={1}>
        <Button
          className={classes.largeButton}
          variant="contained"
          color="primary"
          component={RouterLink}
          to={`/playlists`}
        >
          <PlaylistPlay className={classes.leftIcon} />
          <Typography>プレイリストを探す</Typography>
        </Button>
      </Box>
      <Box display="flex" flexDirection="column" pb={1}>
        <ExerciseSummaryList />
      </Box>
    </Page>
  );
});
