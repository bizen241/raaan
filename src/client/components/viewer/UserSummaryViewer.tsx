import { Avatar, Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import { Person } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { UserSummary } from "../../../shared/api/entities";
import { withEntity } from "../../enhancers/withEntity";
import { UserContext } from "../project/Context";
import { Column, Property } from "../ui";
import { useStyles } from "../ui/styles";

export const UserSummaryViewer = withEntity<UserSummary>({ entityType: "UserSummary" })(
  React.memo(({ entity: userSummary }) => {
    const classes = useStyles();
    const currentUser = useContext(UserContext);

    const isOwn = userSummary.userId === currentUser.id;

    return (
      <Card>
        <CardHeader
          avatar={
            <Avatar className={classes.cardAvatar}>
              <Person />
            </Avatar>
          }
          title={<Typography>{isOwn ? "自分の情報" : "ユーザーの情報"}</Typography>}
        />
        <CardContent>
          <Column>
            <Property label="提出回数">{userSummary.submitCount}</Property>
            <Property label="打鍵回数">{userSummary.typeCount}</Property>
          </Column>
        </CardContent>
      </Card>
    );
  })
);
