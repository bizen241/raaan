import { Avatar, Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import { Done, NotificationImportant, Sync } from "@material-ui/icons";
import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { Message } from "../project/Message";
import { Button, Column, Page, Row } from "../ui";
import { useStyles } from "../ui/styles";

export const AppPage = React.memo(() => {
  const classes = useStyles();

  const { hasUpdate } = useSelector((state: RootState) => ({
    hasUpdate: state.app.hasUpdate
  }));

  return (
    <Page title="アプリについて">
      <Column pb={1}>
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
              <Row>
                <NotificationImportant className={classes.leftIcon} />
                <Typography>更新があります</Typography>
              </Row>
            ) : (
              <Row>
                <Done className={classes.leftIcon} />
                <Typography>最新版です</Typography>
              </Row>
            )}
          </CardContent>
        </Card>
      </Column>
      {hasUpdate && <Button label={<Message id="update" />} onClick={() => location.reload()} />}
    </Page>
  );
});
