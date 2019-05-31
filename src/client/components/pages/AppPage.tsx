import { Button, Card, CardActions, CardContent, CardHeader, Typography } from "@material-ui/core";
import { Done, NotificationImportant } from "@material-ui/icons";
import * as React from "react";
import { connector } from "../../reducers";
import { Message } from "../project/Message";
import { Column, Row } from "../ui";
import { iconStyles } from "../ui/styles";
import { Page } from "./Page";

const AppPage = connector(
  state => ({
    hasUpdate: state.app.hasUpdate
  }),
  () => ({}),
  ({ hasUpdate }) => {
    const iconClasses = iconStyles();

    return (
      <Page>
        <Column padding="vertical">
          <Card>
            <CardHeader title="バージョン" />
            <CardContent>
              {hasUpdate ? (
                <Row>
                  <NotificationImportant className={iconClasses.leftIcon} />
                  <Typography>更新があります</Typography>
                </Row>
              ) : (
                <Row>
                  <Done className={iconClasses.leftIcon} />
                  <Typography>最新版です</Typography>
                </Row>
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
        </Column>
      </Page>
    );
  }
);

export default AppPage;
