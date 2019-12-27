import { Delete, Gavel, SmsFailed } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { withEntity } from "../../enhancers/withEntity";
import { useToggleState } from "../../hooks/useToggleState";
import { DeleteObjectionDialog } from "../dialogs/objections/DeleteObjectionDialog";
import { UserContext } from "../project/Context";
import { Button, Card, Column, Menu, MenuItem, Property } from "../ui";

export const ObjectionViewer = withEntity("Objection")(({ entity: objection }) => {
  const { description, state } = objection;

  const currentUser = useContext(UserContext);

  const [isDeleteDialogOpen, onToggleDeleteDialog] = useToggleState();

  const isOwner = currentUser.permission === "Owner";
  const isOwn = objection.objectorId === currentUser.id;

  return (
    <Column>
      {isOwner && (
        <Button
          color="primary"
          icon={<Gavel />}
          label={state === "pending" ? "対応する" : "編集する"}
          to={`/objections/${objection.id}/edit`}
        />
      )}
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
        {description && <Property label="説明">{description}</Property>}
        <Property label="状態">{state}</Property>
      </Card>
      {isOwn && (
        <DeleteObjectionDialog objectionId={objection.id} isOpen={isDeleteDialogOpen} onClose={onToggleDeleteDialog} />
      )}
    </Column>
  );
});
