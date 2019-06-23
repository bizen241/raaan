import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Typography } from "@material-ui/core";
import { Done, NotificationImportant, Sync } from "@material-ui/icons";
import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { Message } from "../project/Message";
import { useStyles } from "../ui/styles";
import { Page } from "./Page";

const AppPage = React.memo(() => {
  const { hasUpdate } = useSelector((state: RootState) => ({
    hasUpdate: state.app.hasUpdate
  }));

  const classes = useStyles();

  return (
    <Page>
      <Card>
        <CardHeader
          avatar={
            <Avatar className={classes.cardAvatar}>
              <Sync />
            </Avatar>
          }
          title="バージョン"
          titleTypographyProps={{ variant: "h6" }}
        />
        <CardContent>
          {hasUpdate ? (
            <Box display="flex">
              <NotificationImportant className={classes.leftIcon} />
              <Typography>更新があります</Typography>
            </Box>
          ) : (
            <Box display="flex">
              <Done className={classes.leftIcon} />
              <Typography>最新版です</Typography>
            </Box>
          )}
        </CardContent>
        <CardActions>
          {hasUpdate ? (
            <Button color="primary" onClick={() => location.reload()}>
              <Message id="update" />
            </Button>
          ) : (
            <Button color="primary">更新を確認</Button>
          )}
        </CardActions>
      </Card>
    </Page>
  );
});

export default AppPage;
