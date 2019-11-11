import { TableCell, TableRow, Typography } from "@material-ui/core";
import * as React from "react";
import { GroupInvitation, GroupSummary } from "../../../../shared/api/entities";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { useToggleState } from "../../../hooks/useToggleState";
import { UploadGroupMemberDialog } from "../../dialogs/group-members/UploadGroupMemberDialog";
import { Column } from "../../ui";

export const UserGroupInvitationList = createEntityList<GroupInvitation>({ entityType: "GroupInvitation" })(
  React.memo(({ entity: groupInvitation }) => {
    const [isUploadGroupMemberDialogOpen, onToggleUploadGroupMemberDialog] = useToggleState();

    const { entity: groupSummary } = useEntity<GroupSummary>("GroupSummary", groupInvitation.groupSummaryId);
    if (groupSummary === undefined) {
      return null;
    }

    return (
      <TableRow hover>
        <TableCell onClick={onToggleUploadGroupMemberDialog}>
          <Column>
            <Typography>{groupSummary && groupSummary.name}</Typography>
          </Column>
        </TableCell>
        <UploadGroupMemberDialog
          groupId={groupSummary.groupId}
          groupInvitationId={groupInvitation.id}
          isOpen={isUploadGroupMemberDialogOpen}
          onClose={onToggleUploadGroupMemberDialog}
        />
      </TableRow>
    );
  })
);
