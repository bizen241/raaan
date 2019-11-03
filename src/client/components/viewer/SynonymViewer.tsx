import { Link } from "@material-ui/core";
import { Delete, Dns } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Synonym } from "../../../shared/api/entities";
import { withEntity } from "../../enhancers/withEntity";
import { useToggleState } from "../../hooks/useToggleState";
import { DeleteSynonymDialog } from "../dialogs/synonyms/DeleteSynonymDialog";
import { UserContext } from "../project/Context";
import { Card, Column, Menu, MenuItem, Property } from "../ui";

export const SynonymViewer = withEntity<Synonym>({ entityType: "Synonym" })(
  React.memo(({ entityId: synonymId, entity: synonym }) => {
    const currentUser = useContext(UserContext);

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
  })
);
