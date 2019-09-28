import { Avatar, Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import { AccountCircle, Edit, Search, Timeline } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { UserDiaryGraph } from "../graphs/UserDiaryGraph";
import { UserContext } from "../project/Context";
import { Button, Column, Page } from "../ui";
import { useStyles } from "../ui/styles";

export const HomePage = React.memo(() => {
  const classes = useStyles();
  const currentUser = useContext(UserContext);

  const isGuest = currentUser.permission === "Guest";

  return (
    <Page title="ホーム">
      {isGuest && (
        <Column pb={1}>
          <Button color="primary" icon={<AccountCircle />} label="ログイン" to="/account" />
        </Column>
      )}
      {!isGuest && (
        <Column pb={1}>
          <Button color="primary" icon={<AccountCircle />} label="マイページ" to={`/users/${currentUser.id}`} />
        </Column>
      )}
      <Column pb={1}>
        <Button icon={<Search />} label="クイズを探す" to="/contents" />
      </Column>
      <Column pb={1}>
        <Button icon={<Edit />} label="クイズを作る" to="/exercises/edit" />
      </Column>
      {!isGuest && (
        <Column pb={1}>
          <Card>
            <CardHeader
              avatar={
                <Avatar className={classes.cardAvatar}>
                  <Timeline />
                </Avatar>
              }
              title={<Typography>活動記録</Typography>}
            />
            <CardContent>
              <UserDiaryGraph entityId={currentUser.id} />
            </CardContent>
          </Card>
        </Column>
      )}
    </Page>
  );
});
