import { Avatar, Box, Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useContext, useState } from "react";
import { DeleteAccountDialog } from "../dialogs/DeleteAccountDialog";
import { LogoutDialog } from "../dialogs/LogoutDialog";
import { UserContext } from "../project/Context";
import { Message } from "../project/Message";
import { Button, Column, Page } from "../ui";
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
          <Button label="セッション一覧" to="/security" />
        </Column>
        <Column pb={1}>
          <Button label={<Message id="logout" />} labelColor="error" onClick={onToggleLogoutDialog} />
        </Column>
        <Column pb={1}>
          <Button label="アカウントを削除" labelColor="error" onClick={onToggleDeleteAccountDialog} />
        </Column>
        <LogoutDialog isOpen={isLogoutDialogOpen} onClose={onToggleLogoutDialog} />
        <DeleteAccountDialog isOpen={isDeleteAccountDialogOpen} onClose={onToggleDeleteAccountDialog} />
      </Page>
    );
  } else {
    return (
      <Page title="アカウント">
        <Button label="GitHubアカウントでログイン" href="/auth/github" />
      </Page>
    );
  }
});

export default AccountPage;
