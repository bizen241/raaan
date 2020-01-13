import { AddAlert, Keyboard, Person } from "@material-ui/icons";
import React, { useContext } from "react";
import { withEntity } from "../../enhancers/withEntity";
import { useSearch } from "../../hooks/useSearch";
import { useToggleState } from "../../hooks/useToggleState";
import { DeleteTagFollowDialog } from "../dialogs/tags/DeleteTagFollowDialog";
import { UploadTagFollowDialog } from "../dialogs/tags/UploadTagFollowDialog";
import { UserContext } from "../project/Context";
import { Button, Column } from "../ui";
import { TagSummaryViewer } from "./TagSummaryViewer";

export const TagViewer = withEntity("Tag")(
  React.memo(({ entityId: tagId, entity: tag }) => {
    const currentUser = useContext(UserContext);

    const [isUploadTagFollowDialogOpen, onToggleUploadTagFollowDialog] = useToggleState();
    const [isDeleteTagFollowDialogOpen, onToggleDeleteTagFollowDialog] = useToggleState();
    const { entities: follows } = useSearch("TagFollow", {
      followerId: currentUser.id,
      targetId: tagId
    });
    const follow = follows[0];
    const isFollowed = follow !== undefined;

    return (
      <Column>
        <Button icon={<Keyboard />} label="問題集" to={`/exercises?tags=${tag.name}`} />
        <Button icon={<Person />} label="フォロワー" to={`/tags/${tagId}/followers`} />
        {!isFollowed ? (
          <Button icon={<AddAlert />} label="フォローする" onClick={onToggleUploadTagFollowDialog} />
        ) : (
          <Button icon={<AddAlert />} label="フォロー中" onClick={onToggleDeleteTagFollowDialog} />
        )}
        <TagSummaryViewer entityId={tag.summaryId} />
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
