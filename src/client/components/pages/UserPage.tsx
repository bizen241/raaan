import { Button, Typography } from "@material-ui/core";
import { Group, History, Keyboard, Timeline } from "@material-ui/icons";
import { useContext } from "react";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { User } from "../../../shared/api/entities";
import { withEntity } from "../../enhancers/withEntity";
import { UserContext } from "../project/Context";
import { PageProps } from "../project/Router";
import { Column, Page } from "../ui";
import { useStyles } from "../ui/styles";
import { UserSummaryViewer } from "../viewer/UserSummaryViewer";

export const UserPage = React.memo<PageProps>(props => {
  const userId = props.match.params.id;

  const currentUser = useContext(UserContext);

  const isOwn = userId === currentUser.id;

  return (
    <Page title={isOwn ? "マイページ" : "ユーザーページ"}>
      <UserPageContent entityId={userId} />
    </Page>
  );
});

const UserPageContent = withEntity<User, {}>({ entityType: "User" })(({ entityId: userId, entity: user }) => {
  const classes = useStyles();
  const currentUser = useContext(UserContext);

  const isOwn = userId === currentUser.id;

  return (
    <>
      <Column pb={1}>
        <Button
          className={classes.largeButton}
          variant="contained"
          color="primary"
          component={RouterLink}
          to={`/users/${userId}/contents`}
        >
          <Keyboard className={classes.leftIcon} />
          <Typography>自分のコンテンツ</Typography>
        </Button>
      </Column>
      {isOwn && (
        <Column pb={1}>
          <Button className={classes.largeButton} variant="contained" component={RouterLink} to={`/exercises/history`}>
            <Timeline className={classes.leftIcon} />
            <Typography>記録</Typography>
          </Button>
        </Column>
      )}
      {isOwn && (
        <Column pb={1}>
          <Button className={classes.largeButton} variant="contained" component={RouterLink} to={`/exercises/history`}>
            <History className={classes.leftIcon} />
            <Typography>復習</Typography>
          </Button>
        </Column>
      )}
      {isOwn && (
        <Column pb={1}>
          <Button className={classes.largeButton} variant="contained" component={RouterLink} to={`/exercises/history`}>
            <Group className={classes.leftIcon} />
            <Typography>グループ</Typography>
          </Button>
        </Column>
      )}
      <Column pb={1}>
        <UserSummaryViewer entityId={user.summaryId} />
      </Column>
    </>
  );
});
