import { AddAlert, Keyboard, Person } from "@material-ui/icons";
import React from "react";
import { withEntity } from "../../enhancers/withEntity";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useEntity } from "../../hooks/useEntity";
import { useSearch } from "../../hooks/useSearch";
import { useToggleState } from "../../hooks/useToggleState";
import { DeleteTagFollowDialog } from "../dialogs/tags/DeleteTagFollowDialog";
import { UploadTagFollowDialog } from "../dialogs/tags/UploadTagFollowDialog";
import { Button, Column } from "../ui";
import { TagSummaryViewer } from "./TagSummaryViewer";

export const TagViewer = withEntity("Tag")(
  React.memo(({ entity: tag }) => {
    const { currentUserId } = useCurrentUser();

    const [isUploadTagFollowDialogOpen, onToggleUploadTagFollowDialog] = useToggleState();
    const [isDeleteTagFollowDialogOpen, onToggleDeleteTagFollowDialog] = useToggleState();
    const { entities: follows } = useSearch("TagFollow", {
      followerId: currentUserId,
      targetId: tag.id
    });
    const follow = follows[0];
    const isFollowed = follow !== undefined;

    const { entity: tagSummary } = useEntity("TagSummary", tag.summaryId);

    return (
      <Column>
        <Button icon={<Keyboard />} label="問題集" to={`/exercises?tags=${tag.name}`} />
        <Button icon={<Person />} label="フォロワー" to={`/tags/${tag.id}/followers`} />
        {!isFollowed ? (
          <Button icon={<AddAlert />} label="フォローする" onClick={onToggleUploadTagFollowDialog} />
        ) : (
          <Button icon={<AddAlert />} label="フォロー中" onClick={onToggleDeleteTagFollowDialog} />
        )}
        <TagSummaryViewer tag={tag} tagSummary={tagSummary} />
        <UploadTagFollowDialog
          targetId={tag.id}
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
