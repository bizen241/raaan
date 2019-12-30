import { Delete, SmsFailed } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { withEntity } from "../../enhancers/withEntity";
import { useToggleState } from "../../hooks/useToggleState";
import { DeleteObjectionDialog } from "../dialogs/objections/DeleteObjectionDialog";
import { UserContext } from "../project/Context";
import { Card, Menu, MenuItem, Property } from "../ui";

export const ObjectionSummaryViewer = withEntity("ObjectionSummary")(({ entity: objection }) => {
  const { state } = objection;

  const currentUser = useContext(UserContext);

  const [isDeleteDialogOpen, onToggleDeleteDialog] = useToggleState();

  const isOwn = objection.objectorId === currentUser.id;

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
      {isOwn && (
        <DeleteObjectionDialog objectionId={objection.id} isOpen={isDeleteDialogOpen} onClose={onToggleDeleteDialog} />
      )}
    </Card>
  );
});
