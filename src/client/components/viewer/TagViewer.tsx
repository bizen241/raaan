import { Avatar, Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import { AddAlert, Label } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { Tag, TagFollow } from "../../../shared/api/entities";
import { withEntity } from "../../enhancers/withEntity";
import { useSearch } from "../../hooks/useSearch";
import { useToggleState } from "../../hooks/useToggleState";
import { DeleteTagFollowDialog } from "../dialogs/tags/DeleteTagFollowDialog";
import { UploadTagFollowDialog } from "../dialogs/tags/UploadTagFollowDialog";
import { UserContext } from "../project/Context";
import { Button, Column, Property } from "../ui";
import { useStyles } from "../ui/styles";

export const TagViewer = withEntity<Tag>({ entityType: "Tag" })(
  React.memo(({ entityId: tagId, entity: tag }) => {
    const classes = useStyles();
    const currentUser = useContext(UserContext);

    const [isUploadTagFollowDialogOpen, onToggleUploadTagFollowDialog] = useToggleState();
    const [isDeleteTagFollowDialogOpen, onToggleDeleteTagFollowDialog] = useToggleState();
    const { entities: follows } = useSearch<TagFollow>("TagFollow", {
      followerId: currentUser.id,
      targetId: tagId
    });
    const follow = follows[0];
    const isFollowed = follow !== undefined;

    return (
      <Column>
        {!isFollowed ? (
          <Button icon={<AddAlert />} label="フォローする" onClick={onToggleUploadTagFollowDialog} />
        ) : (
          <Button icon={<AddAlert />} label="フォロー中" onClick={onToggleDeleteTagFollowDialog} />
        )}
        <Column pb={1}>
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
        </Column>
        <UploadTagFollowDialog
          targetId={tagId}
          isOpen={isUploadTagFollowDialogOpen}
          onClose={onToggleUploadTagFollowDialog}
        />
        {follow && (
          <DeleteTagFollowDialog
            tagFollowId={follow.id}
            isOpen={isDeleteTagFollowDialogOpen}
            onClose={onToggleDeleteTagFollowDialog}
          />
        )}
      </Column>
    );
  })
);
