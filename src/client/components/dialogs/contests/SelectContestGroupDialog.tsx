import React from "react";
import { EntityId } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { SelectContestGroupList } from "../../lists/group-members/SelectContestGroupList";

export const SelectContestGroupDialog = createDialog<{
  exerciseId: EntityId<"Exercise">;
}>()(
  React.memo(({ t }) => t("セッションのグループを選択")),
  React.memo(({ exerciseId }) => {
    return <SelectContestGroupList exerciseId={exerciseId} />;
  })
);
