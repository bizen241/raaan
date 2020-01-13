import { Link } from "@material-ui/core";
import { Delete, SmsFailed } from "@material-ui/icons";
import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { withEntity } from "../../enhancers/withEntity";
import { useToggleState } from "../../hooks/useToggleState";
import { DeleteObjectionDialog } from "../dialogs/objections/DeleteObjectionDialog";
import { UserContext } from "../project/Context";
import { Card, Menu, MenuItem, Property } from "../ui";

export const ObjectionSummaryViewer = withEntity("ObjectionSummary")(({ entity: objectionSummary }) => {
  const { state, commentCount } = objectionSummary;

  const currentUser = useContext(UserContext);

  const [isDeleteDialogOpen, onToggleDeleteDialog] = useToggleState();

  const isOwn = objectionSummary.objectorId === currentUser.id;

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
