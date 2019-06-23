import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader } from "@material-ui/core";
import { Edit, Flag, Home, Keyboard } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { UserContext } from "../project/Context";
import { Message } from "../project/Message";
import { useStyles } from "../ui/styles";
import { UserSummaryViewer } from "../viewer/UserSummaryViewer";
import { Page } from "./Page";

export const HomePage = React.memo(() => {
  const currentUser = useContext(UserContext);

  const classes = useStyles();

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
        <Button className={classes.largeButton} variant="contained" component={RouterLink} to="/exercises/edit">
          <Edit className={classes.leftIcon} />
          作る
        </Button>
      </Box>
      {currentUser.permission !== "Guest" ? (
        <Card>
          <CardHeader
            avatar={
              <Avatar className={classes.cardAvatar}>
                <Flag />
              </Avatar>
            }
            title="活動記録"
            titleTypographyProps={{ variant: "h6" }}
          />
          <CardContent>
            <UserSummaryViewer entityId={currentUser.summaryId} />
          </CardContent>
        </Card>
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
    </Page>
  );
});
