import { Avatar, Box, Button, Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useContext, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { DeleteAccountDialog } from "../dialogs/DeleteAccountDialog";
import { LogoutDialog } from "../dialogs/LogoutDialog";
import { UserContext } from "../project/Context";
import { Message } from "../project/Message";
import { Column, Page } from "../ui";
import { useStyles } from "../ui/styles";
import { UserAccountViewer } from "../viewer/UserAccountViewer";

const AccountPage = React.memo(() => {
  const classes = useStyles();
  const currentUser = useContext(UserContext);

  const [isLogoutDialogOpen, toggleLogoutDialog] = useState(false);
  const [isDeleteAccountDialogOpen, toggleDeleteAccountDialog] = useState(false);
  const onToggleLogoutDialog = useCallback(() => toggleLogoutDialog(s => !s), []);
  const onToggleDeleteAccountDialog = useCallback(() => toggleDeleteAccountDialog(s => !s), []);

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
        <Column pb={1}>
          <Button className={classes.largeButton} variant="contained" component={RouterLink} to="/sessions">
            <Typography>セッション一覧</Typography>
          </Button>
        </Column>
        <Column pb={1}>
          <Button className={classes.largeButton} variant="contained" onClick={onToggleLogoutDialog}>
            <Typography color="error">
              <Message id="logout" />
            </Typography>
          </Button>
        </Column>
        <Column pb={1}>
          <Button className={classes.largeButton} variant="contained" onClick={onToggleDeleteAccountDialog}>
            <Typography color="error">アカウントを削除</Typography>
          </Button>
        </Column>
        <LogoutDialog isOpen={isLogoutDialogOpen} onClose={onToggleLogoutDialog} />
        <DeleteAccountDialog isOpen={isDeleteAccountDialogOpen} onClose={onToggleDeleteAccountDialog} />
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
