import { Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { EntityId } from "../../../../shared/api/entities";
import { createDialog, dialogTimeout } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card } from "../../ui";

export const DeleteReportDialog = createDialog<{
  reportId: EntityId<"Report">;
}>()(
  React.memo(({ t }) => t("報告の削除")),
  React.memo(({ reportId, onClose }) => {
    const dispatch = useDispatch();

    const onDelete = () => {
      dispatch(actions.api.delete("Report", reportId, dialogTimeout, onClose));
    };

    return (
      <>
        <Card>
          <Typography>報告がサーバーから削除されます。</Typography>
        </Card>
        <Button icon={<Delete color="error" />} label="報告を削除" labelColor="error" onClick={onDelete} />
      </>
    );
  })
);
