import { Typography } from "@material-ui/core";
import { ReportProblem } from "@material-ui/icons";
import { replace } from "connected-react-router";
import React from "react";
import { useDispatch } from "react-redux";
import { endpoints } from "../../../../shared/api/endpoint";
import { EntityId, ObjectionTargetType } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card } from "../../ui";

export const UploadObjectionDialog = createDialog<{
  objectionId: EntityId<"Objection">;
  targetType: ObjectionTargetType;
  targetId: string;
}>()(
  React.memo(({ t }) => t("抗議をアップロード")),
  React.memo(({ objectionId, targetId, targetType }) => {
    const dispatch = useDispatch();

    const onUpload = () => {
      dispatch(
        actions.api.upload("Objection", objectionId, undefined, (uploadResponse) => {
          dispatch(
            actions.cache.add(
              "Objection",
              {
                targetType,
                targetId,
              },
              uploadResponse
            )
          );

          const path = endpoints[targetType];

          dispatch(replace(`/${path}/${targetId}`));
        })
      );
    };

    return (
      <>
        <Card>
          <Typography>抗議をアップロードします。</Typography>
        </Card>
        <Button icon={<ReportProblem />} label="抗議をアップロード" onClick={onUpload} />
      </>
    );
  })
);
