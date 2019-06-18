import { Avatar, Box, Button, Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import { Edit, Flag, Keyboard } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { UserContext } from "../project/Context";
import { iconStyles } from "../ui/styles";
import { UserSummaryViewer } from "../viewer/UserSummaryViewer";
import { Page } from "./Page";

export const HomePage = React.memo(() => {
  const currentUser = useContext(UserContext);

  const classes = iconStyles();

  return (
    <Page title="ホーム">
      <Box display="flex" flexDirection="column" pb={1}>
        <Button variant="contained" color="primary" component={RouterLink} to="/exercises">
          <Keyboard className={classes.leftIcon} />
          <Typography variant="h6">遊ぶ</Typography>
        </Button>
      </Box>
      <Box display="flex" flexDirection="column" pb={1}>
        <Button variant="contained" component={RouterLink} to="/exercises/edit">
          <Edit className={classes.leftIcon} />
          <Typography variant="h6">作る</Typography>
        </Button>
      </Box>
      <Card>
        <CardHeader
          avatar={
            <Avatar>
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
    </Page>
  );
});
