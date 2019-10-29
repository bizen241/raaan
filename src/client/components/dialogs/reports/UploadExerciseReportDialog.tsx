import { Typography } from "@material-ui/core";
import { ReportProblem, Warning } from "@material-ui/icons";
import { replace } from "connected-react-router";
import { useContext } from "react";
import * as React from "react";
import { useDispatch } from "react-redux";
import { ExerciseReport } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { UserContext } from "../../project/Context";
import { Button, Card, DialogContent } from "../../ui";

export const UploadExerciseReportDialog = createDialog<{
  reportId: string;
  targetId: string;
}>(
  React.memo(({ reportId, targetId, onClose }) => {
    const dispatch = useDispatch();
    const currentUser = useContext(UserContext);

    const onUpload = () => {
      dispatch(
        actions.api.upload<ExerciseReport>("ExerciseReport", reportId, undefined, uploadResponse => {
          dispatch(
            actions.cache.add<ExerciseReport>(
              "ExerciseReport",
              {
                reporterId: currentUser.id,
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
