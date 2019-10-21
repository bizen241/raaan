import { Typography } from "@material-ui/core";
import { ReportProblem, Warning } from "@material-ui/icons";
import { replace } from "connected-react-router";
import { useContext, useEffect } from "react";
import * as React from "react";
import { useDispatch } from "react-redux";
import { ExerciseReport } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { useEntity } from "../../../hooks/useEntity";
import { actions } from "../../../reducers";
import { UserContext } from "../../project/Context";
import { Button, DialogActions, DialogHeader, DialogMessage } from "../../ui";

export const UploadExerciseReportDialog = createDialog<{
  reportId: string;
  targetId: string;
}>(
  React.memo(({ reportId, targetId, onClose }) => {
    const dispatch = useDispatch();
    const currentUser = useContext(UserContext);

    const onUpload = () => {
      dispatch(actions.api.upload<ExerciseReport>("ExerciseReport", reportId));
    };
    const { uploadStatus, uploadResponse } = useEntity<ExerciseReport>("ExerciseReport", reportId);
    useEffect(() => {
      if (uploadStatus === 200 && uploadResponse !== undefined) {
        dispatch(
          actions.cache.search<ExerciseReport>(
            "ExerciseReport",
            {
              reporterId: currentUser.id,
              targetId
            },
            {
              ids: [Object.keys(uploadResponse.ExerciseReport)[0]],
              entities: {},
              count: 1
            }
          )
        );

        dispatch(replace(`/exercises/${targetId}`));
      }
    }, [uploadStatus]);

    return (
      <>
        <DialogHeader onClose={onClose}>
          <Typography>違反を報告する</Typography>
        </DialogHeader>
        <DialogMessage icon={<Warning />}>
          <Typography>通報します。</Typography>
        </DialogMessage>
        <DialogActions>
          <Button icon={<ReportProblem />} label="通報する" onClick={onUpload} />
          <Button label="キャンセル" onClick={onClose} />
        </DialogActions>
      </>
    );
  })
);
