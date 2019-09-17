import { Box, Button, Typography } from "@material-ui/core";
import { History, Keyboard, PlaylistPlay } from "@material-ui/icons";
import { useContext } from "react";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { UserContext } from "../project/Context";
import { PageProps } from "../project/Router";
import { Page } from "../ui/Page";
import { useStyles } from "../ui/styles";

export const UserPage = React.memo<PageProps>(props => {
  const userId = props.match.params.id;

  const classes = useStyles();
  const currentUser = useContext(UserContext);

  const isOwn = userId === currentUser.id;

  return (
    <Page title={isOwn ? "マイページ" : "ユーザーページ"}>
      <Box display="flex" flexDirection="column" pb={1}>
        <Button
          className={classes.largeButton}
          variant="contained"
          color="primary"
          component={RouterLink}
          to={`/users/${userId}/exercises`}
        >
          <Keyboard className={classes.leftIcon} />
          <Typography>クイズ</Typography>
        </Button>
      </Box>
      <Box display="flex" flexDirection="column" pb={1}>
        <Button
          className={classes.largeButton}
          variant="contained"
          color="primary"
          component={RouterLink}
          to={`/users/${userId}/playlists`}
        >
          <PlaylistPlay className={classes.leftIcon} />
          <Typography>プレイリスト</Typography>
        </Button>
      </Box>
      {isOwn && (
        <Box display="flex" flexDirection="column" pb={1}>
          <Button className={classes.largeButton} variant="contained" component={RouterLink} to={`/exercises/history`}>
            <History className={classes.leftIcon} />
            <Typography>提出履歴</Typography>
          </Button>
        </Box>
      )}
    </Page>
  );
});
