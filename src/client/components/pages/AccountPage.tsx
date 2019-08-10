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
              title={<Typography>アカウント情報</Typography>}
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
              title={
                <Typography>
                  <Message id="logout" />
                </Typography>
              }
            />
            <CardContent>
              <Typography>すべての下書きがブラウザから削除されます。</Typography>
            </CardContent>
            <CardActions>
              <Button className={classes.largeButton} color="primary" component="a" href="/logout">
                <Typography>
                  <Message id="logout" />
                </Typography>
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
            title={<Typography>アカウント削除</Typography>}
          />
          <CardContent>
            <Typography>すべての情報がサーバーから削除されます。</Typography>
          </CardContent>
          <CardActions>
            <Button className={classes.largeButton} color="primary" component="a" href="/logout">
              <Typography>アカウントを削除</Typography>
            </Button>
          </CardActions>
        </Card>
      </Page>
    );
  } else {
    return (
      <Page title="アカウント">
        <Button className={classes.largeButton} variant="contained" component="a" href="/auth/github">
          <Typography>GitHubアカウントでログイン</Typography>
        </Button>
      </Page>
    );
  }
});

export default AccountPage;
