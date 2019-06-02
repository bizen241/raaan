import { Button, Card, CardActions, CardContent, CardHeader, Grid, Typography } from "@material-ui/core";
import { Done, NotificationImportant } from "@material-ui/icons";
import * as React from "react";
import { connector } from "../../reducers";
import { Message } from "../project/Message";
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
        <Card>
          <CardHeader title="バージョン" />
          <CardContent>
            {hasUpdate ? (
              <Grid container>
                <Grid item>
                  <NotificationImportant className={iconClasses.leftIcon} />
                </Grid>
                <Grid item xs zeroMinWidth>
                  <Typography>更新があります</Typography>
                </Grid>
              </Grid>
            ) : (
              <Grid container>
                <Grid item>
                  <Done className={iconClasses.leftIcon} />
                </Grid>
                <Grid item xs zeroMinWidth>
                  <Typography>最新版です</Typography>
                </Grid>
              </Grid>
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
  }
);

export default AppPage;
