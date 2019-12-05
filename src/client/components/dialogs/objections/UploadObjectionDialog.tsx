import { Typography } from "@material-ui/core";
import { ReportProblem } from "@material-ui/icons";
import { replace } from "connected-react-router";
import * as React from "react";
import { useDispatch } from "react-redux";
import { endpoints } from "../../../../shared/api/endpoint";
import { Objection, ObjectionTarget } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card, DialogContent } from "../../ui";

export const UploadObjectionDialog = createDialog<{
  reportId: string;
  targetType: ObjectionTarget;
  targetId: string;
}>(
  React.memo(({ reportId, targetId, targetType, onClose }) => {
    const dispatch = useDispatch();

    const onUpload = () => {
      dispatch(
        actions.api.upload<Objection>("Objection", reportId, undefined, () => {
          const path = endpoints[targetType];

          dispatch(replace(`/${path}/${targetId}`));
        })
      );
    };

    return (
      <DialogContent title="異議を申し立てる" onClose={onClose}>
        <Card>
          <Typography>異議を申し立てます。</Typography>
        </Card>
        <Button icon={<ReportProblem />} label="異議をアップロード" onClick={onUpload} />
      </DialogContent>
    );
  })
);
