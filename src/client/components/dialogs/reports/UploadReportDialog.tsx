import { Typography } from "@material-ui/core";
import { ReportProblem } from "@material-ui/icons";
import { replace } from "connected-react-router";
import * as React from "react";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { endpoints } from "../../../../shared/api/endpoint";
import { ReportTargetType } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { UserContext } from "../../project/Context";
import { Button, Card, DialogContent } from "../../ui";

export const UploadReportDialog = createDialog<{
  reportId: string;
  targetType: ReportTargetType;
  targetId: string;
}>(
  React.memo(({ reportId, targetId, targetType, onClose }) => {
    const dispatch = useDispatch();
    const currentUser = useContext(UserContext);

    const onUpload = () => {
      dispatch(
        actions.api.upload("Report", reportId, undefined, uploadResponse => {
          dispatch(
            actions.cache.add(
              "Report",
              {
                reporterId: currentUser.id,
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
      <DialogContent title="報告をアップロードする" onClose={onClose}>
        <Card>
          <Typography>報告をアップロードします。</Typography>
        </Card>
        <Button icon={<ReportProblem />} label="報告をアップロード" onClick={onUpload} />
      </DialogContent>
    );
  })
);
