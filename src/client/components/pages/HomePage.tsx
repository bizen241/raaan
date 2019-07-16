import { Avatar, Box, Button, Card, CardActions, CardHeader } from "@material-ui/core";
import { Edit, History, Home, Keyboard } from "@material-ui/icons";
import { useContext } from "react";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { UserContext } from "../project/Context";
import { Message } from "../project/Message";
import { useStyles } from "../ui/styles";
import { UserSummaryViewer } from "../viewer/UserSummaryViewer";
import { Page } from "./Page";

export const HomePage = React.memo(() => {
  const classes = useStyles();
  const currentUser = useContext(UserContext);

  const isGuest = currentUser.permission === "Guest";

  return (
    <Page title="ホーム">
      <Box display="flex" flexDirection="column" pb={1}>
        <Button
          className={classes.largeButton}
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/exercises"
        >
          <Keyboard className={classes.leftIcon} />
          遊ぶ
        </Button>
      </Box>
      <Box display="flex" flexDirection="column" pb={1}>
        <Button
          className={classes.largeButton}
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/exercises/edit"
        >
          <Edit className={classes.leftIcon} />
          作る
        </Button>
      </Box>
      <Box pb={1}>
        {!isGuest ? (
          <UserSummaryViewer entityId={currentUser.summaryId} />
        ) : (
          <Card>
            <CardHeader
              avatar={
                <Avatar className={classes.cardAvatar}>
                  <Home />
                </Avatar>
              }
              title="ようこそ"
              titleTypographyProps={{ variant: "h6" }}
            />
            <CardActions>
              <Button className={classes.largeButton} color="primary" component={RouterLink} to="/account">
                <Message id="login" />
              </Button>
            </CardActions>
          </Card>
        )}
      </Box>
      <Box display="flex" flexDirection="column" pb={1}>
        <Button className={classes.largeButton} variant="contained" component={RouterLink} to={`/exercises/history`}>
          <History className={classes.leftIcon} />
          履歴
        </Button>
      </Box>
    </Page>
  );
});
