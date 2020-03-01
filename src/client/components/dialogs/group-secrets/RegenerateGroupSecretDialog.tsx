import { Typography } from "@material-ui/core";
import { Refresh } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { EntityId } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card } from "../../ui";

export const RegenerateGroupSecretDialog = createDialog<{
  groupSecretId: EntityId<"GroupSecret">;
}>()(
  React.memo(({ t }) => t("招待用リンクを再生成")),
  React.memo(({ groupSecretId, onClose }) => {
    const dispatch = useDispatch();

    const onUpload = () => {
      dispatch(
        actions.api.upload(
          "GroupSecret",
          groupSecretId,
          {
            expireAt: Date.now() + 1000 * 60 * 60
          },
          onClose
        )
      );
    };

    return (
      <>
        <Card>
          <Typography>招待用リンクを再生成します。</Typography>
        </Card>
        <Button icon={<Refresh />} label="招待用リンクを再生成" onClick={onUpload} />
      </>
    );
  })
);
