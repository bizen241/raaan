import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Typography } from "@material-ui/core";
import { AccountCircle, Delete, Warning } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { UserSessionList } from "../list/search/UserSessionList";
import { UserContext } from "../project/Context";
import { Message } from "../project/Message";
import { useStyles } from "../ui/styles";
import { UserAccountViewer } from "../viewer/UserAccountViewer";
import { Page } from "./Page";

const AccountPage = React.memo(() => {
  const currentUser = useContext(UserContext);

  const classes = useStyles();

  if (currentUser.permission !== "Guest") {
    return (
      <Page title="アカウント">
        <Box pb={1}>
          <Card>
            <CardHeader
              avatar={
                <Avatar className={classes.cardAvatar}>
                  <AccountCircle />
                </Avatar>
              }
              title="アカウント情報"
              titleTypographyProps={{ variant: "h6" }}
            />
            <CardContent>
              <UserAccountViewer entityId={currentUser.accountId} />
            </CardContent>
          </Card>
        </Box>
        <Box pb={1}>
          <UserSessionList
            title="セッション一覧"
            initialSearchParams={{
              userId: currentUser.id
            }}
          />
        </Box>
        <Box pb={1}>
          <Card>
            <CardHeader
              avatar={
                <Avatar className={classes.cardAvatar}>
                  <Delete />
                </Avatar>
              }
              title={<Message id="logout" />}
              titleTypographyProps={{ variant: "h6" }}
            />
            <CardContent>
              <Typography variant="body1">すべての下書きがブラウザから削除されます。</Typography>
            </CardContent>
            <CardActions>
              <Button className={classes.largeButton} color="primary" component="a" href="/logout">
                <Message id="logout" />
              </Button>
            </CardActions>
          </Card>
        </Box>
        <Card>
          <CardHeader
            avatar={
              <Avatar className={classes.cardAvatar}>
                <Warning />
              </Avatar>
            }
            title="アカウント削除"
            titleTypographyProps={{ variant: "h6" }}
          />
          <CardContent>
            <Typography variant="body1">すべての情報がサーバーから削除されます。</Typography>
          </CardContent>
          <CardActions>
            <Button className={classes.largeButton} color="primary" component="a" href="/logout">
              アカウントを削除
            </Button>
          </CardActions>
        </Card>
      </Page>
    );
  } else {
    return (
      <Page title="アカウント">
        <Button className={classes.largeButton} variant="contained" component="a" href="/auth/github">
          GitHubアカウントでログイン
        </Button>
      </Page>
    );
  }
});

export default AccountPage;
