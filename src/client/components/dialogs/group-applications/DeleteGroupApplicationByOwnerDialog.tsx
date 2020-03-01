import { Typography } from "@material-ui/core";
import { RemoveCircle } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { EntityId } from "../../../../shared/api/entities";
import { createDialog, dialogTimeout } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card } from "../../ui";

export const DeleteGroupApplicationByOwnerDialog = createDialog<{
  groupApplicationId: EntityId<"GroupApplication">;
}>()(
  React.memo(({ t }) => t("申請の拒絶")),
  React.memo(({ groupApplicationId, onClose }) => {
    const dispatch = useDispatch();

    const onDelete = () => {
      dispatch(actions.api.delete("GroupApplication", groupApplicationId, dialogTimeout, onClose));
    };

    return (
      <>
        <Card>
          <Typography>申請を拒絶します。</Typography>
        </Card>
        <Button icon={<RemoveCircle color="error" />} label="申請を拒絶" labelColor="error" onClick={onDelete} />
      </>
    );
  })
);
