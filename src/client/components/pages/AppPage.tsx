import { Avatar, Box, Button, Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import { Done, NotificationImportant, Sync } from "@material-ui/icons";
import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { Message } from "../project/Message";
import { useStyles } from "../ui/styles";
import { Page } from "./Page";

const AppPage = React.memo(() => {
  const classes = useStyles();

  const { hasUpdate } = useSelector((state: RootState) => ({
    hasUpdate: state.app.hasUpdate
  }));

  return (
    <Page>
      <Box display="flex" flexDirection="column" pb={1}>
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
        </Card>
      </Box>
      {hasUpdate && (
        <Button className={classes.largeButton} variant="contained" onClick={() => location.reload()}>
          <Typography>
            <Message id="update" />
          </Typography>
        </Button>
      )}
    </Page>
  );
});

export default AppPage;
