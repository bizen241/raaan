import React from "react";
import { createDialog } from "../../../enhancers/createDialog";
import { SelectContestGroupList } from "../../lists/group-members/SelectContestGroupList";
import { DialogContent } from "../../ui";

export const SelectContestGroupDialog = createDialog<{
  exerciseId: string;
}>(
  React.memo(({ exerciseId, onClose }) => {
    return (
      <DialogContent title="セッションのグループを選択" onClose={onClose}>
        <SelectContestGroupList exerciseId={exerciseId} />
      </DialogContent>
    );
  })
);
