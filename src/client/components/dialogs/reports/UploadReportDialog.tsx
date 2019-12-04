import { Typography } from "@material-ui/core";
import { ReportProblem, Warning } from "@material-ui/icons";
import { replace } from "connected-react-router";
import { useContext } from "react";
import * as React from "react";
import { useDispatch } from "react-redux";
import { Report, ReportTarget } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { UserContext } from "../../project/Context";
import { Button, Card, DialogContent } from "../../ui";

export const UploadReportDialog = createDialog<{
  reportId: string;
  targetType: ReportTarget;
  targetId: string;
}>(
  React.memo(({ reportId, targetId, targetType, onClose }) => {
    const dispatch = useDispatch();
    const currentUser = useContext(UserContext);

    const onUpload = () => {
      dispatch(
        actions.api.upload<Report>("Report", reportId, undefined, uploadResponse => {
          dispatch(
            actions.cache.add<Report>(
              "Report",
              {
                reporterId: currentUser.id,
                targetType,
                targetId
              },
              uploadResponse
            )
          );

          dispatch(replace(`/exercises/${targetId}`));
        })
      );
    };

    return (
      <DialogContent title="違反を報告する" onClose={onClose}>
        <Card icon={<Warning />} title="違反を報告する">
          <Typography>違反を報告します。</Typography>
        </Card>
        <Button icon={<ReportProblem />} label="報告をアップロード" onClick={onUpload} />
      </DialogContent>
    );
  })
);
