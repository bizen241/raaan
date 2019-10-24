import { Avatar, Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import { Label } from "@material-ui/icons";
import * as React from "react";
import { Tag } from "../../../shared/api/entities";
import { withEntity } from "../../enhancers/withEntity";
import { Column, Property } from "../ui";
import { useStyles } from "../ui/styles";

export const TagViewer = withEntity<Tag>({ entityType: "Tag" })(
  React.memo(({ entity: tag }) => {
    const classes = useStyles();

    return (
      <Card>
        <CardHeader
          avatar={
            <Avatar className={classes.cardAvatar}>
              <Label />
            </Avatar>
          }
          title={<Typography>{tag.name}</Typography>}
        />
        <CardContent>
          <Column>
            <Property label="更新日時">{new Date(tag.updatedAt).toLocaleDateString()}</Property>
          </Column>
        </CardContent>
      </Card>
    );
  })
);
