import { Link } from "@material-ui/core";
import { Delete, SmsFailed } from "@material-ui/icons";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { withEntity } from "../../enhancers/withEntity";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useToggleState } from "../../hooks/useToggleState";
import { DeleteObjectionDialog } from "../dialogs/objections/DeleteObjectionDialog";
import { Card, Menu, MenuItem, Property } from "../ui";

export const ObjectionSummaryViewer = withEntity("ObjectionSummary")(({ entity: objectionSummary }) => {
  const { state, commentCount } = objectionSummary;

  const { currentUserId } = useCurrentUser();

  const [isDeleteDialogOpen, onToggleDeleteDialog] = useToggleState();

  const isOwn = objectionSummary.objectorId === currentUserId;

  return (
    <Card
      icon={<SmsFailed />}
      title="抗議"
      action={
        isOwn && (
          <Menu>
            <MenuItem icon={<Delete />} label="削除" onClick={onToggleDeleteDialog} />
          </Menu>
        )
      }
    >
      <Property label="状態">{state}</Property>
      <Property label="コメント">
        <Link
          underline="always"
          color="textPrimary"
          component={RouterLink}
          to={`/objections/${objectionSummary.parentId}/comments`}
        >
          {commentCount}
        </Link>
      </Property>
      {isOwn && (
        <DeleteObjectionDialog
          objectionId={objectionSummary.id}
          isOpen={isDeleteDialogOpen}
          onClose={onToggleDeleteDialog}
        />
      )}
    </Card>
  );
});
