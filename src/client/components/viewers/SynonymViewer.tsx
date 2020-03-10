import { Link } from "@material-ui/core";
import { Delete, Dns } from "@material-ui/icons";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { EntityId } from "../../../shared/api/entities";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useEntity } from "../../hooks/useEntity";
import { useToggleState } from "../../hooks/useToggleState";
import { DeleteSynonymDialog } from "../dialogs/synonyms/DeleteSynonymDialog";
import { Card, Column, Menu, MenuItem, Property } from "../ui";

export const SynonymViewer = React.memo<{
  synonymId: EntityId<"Synonym">;
}>(({ synonymId }) => {
  const { currentUser } = useCurrentUser();

  const { entity: synonym } = useEntity("Synonym", synonymId);

  const [isDeleteDialogOpen, onToggleDeleteDialog] = useToggleState();

  const isOwner = currentUser.permission === "Owner";

  return (
    <Column>
      <Card
        icon={<Dns />}
        title={synonym.name}
        action={
          <Menu>{isOwner && <MenuItem icon={<Delete />} label="削除する" onClick={onToggleDeleteDialog} />}</Menu>
        }
      >
        <Property label="変換先">
          <Link underline="always" color="textPrimary" component={RouterLink} to={`/tags/${synonym.target}`}>
            {synonym.target}
          </Link>
        </Property>
      </Card>
      <DeleteSynonymDialog
        synonymId={synonymId}
        target={synonym.target}
        isOpen={isDeleteDialogOpen}
        onClose={onToggleDeleteDialog}
      />
    </Column>
  );
});
