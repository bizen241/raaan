import { Typography } from "@material-ui/core";
import { SmsFailed } from "@material-ui/icons";
import { push } from "connected-react-router";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ObjectionTargetType } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { generateLocalEntityId } from "../../../reducers/entity";
import { Button, Card } from "../../ui";

export const ConfirmObjectionDialog = createDialog<{
  targetType: ObjectionTargetType;
  targetId: string;
}>()(
  React.memo(({ t }) => t("抗議する")),
  React.memo(({ targetType, targetId }) => {
    const dispatch = useDispatch();

    const onCreate = useCallback(() => {
      const bufferId = generateLocalEntityId();

      dispatch(
        actions.buffers.update("Objection", bufferId, {
          targetType,
          targetId
        })
      );
      dispatch(push(`/objections/${bufferId}/edit`));
    }, []);

    return (
      <>
        <Card>
          <Typography>本当に抗議しますか？</Typography>
        </Card>
        <Button icon={<SmsFailed />} label="抗議する" onClick={onCreate} />
      </>
    );
  })
);
