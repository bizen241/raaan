import { Typography } from "@material-ui/core";
import { ReportProblem } from "@material-ui/icons";
import { replace } from "connected-react-router";
import * as React from "react";
import { useDispatch } from "react-redux";
import { endpoints } from "../../../../shared/api/endpoint";
import { ObjectionTargetType } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card, DialogContent } from "../../ui";

export const UploadObjectionDialog = createDialog<{
  reportId: string;
  targetType: ObjectionTargetType;
  targetId: string;
}>(
  React.memo(({ reportId, targetId, targetType, onClose }) => {
    const dispatch = useDispatch();

    const onUpload = () => {
      dispatch(
        actions.api.upload("Objection", reportId, undefined, uploadResponse => {
          dispatch(
            actions.cache.add(
              "Objection",
              {
                targetType,
                targetId
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
      <DialogContent title="抗議をアップロード" onClose={onClose}>
        <Card>
          <Typography>抗議をアップロードします。</Typography>
        </Card>
        <Button icon={<ReportProblem />} label="抗議をアップロード" onClick={onUpload} />
      </DialogContent>
    );
  })
);
