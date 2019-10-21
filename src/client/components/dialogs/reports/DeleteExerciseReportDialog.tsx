import { Typography } from "@material-ui/core";
import { Delete, Warning } from "@material-ui/icons";
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

export const DeleteExerciseReportDialog = createDialog<{
  reportId: string;
  targetId: string;
}>(
  React.memo(({ reportId, targetId, onClose }) => {
    const dispatch = useDispatch();
    const currentUser = useContext(UserContext);

    const onDelete = () => {
      dispatch(actions.api.delete("ExerciseReport", reportId));
    };
    const { deleteStatus } = useEntity<ExerciseReport>("ExerciseReport", reportId);
    useEffect(() => {
      if (deleteStatus === 200) {
        dispatch(
          actions.cache.search<ExerciseReport>(
            "ExerciseReport",
            {
              reporterId: currentUser.id,
              targetId
            },
            {
              ids: [],
              entities: {},
              count: 0
            }
          )
        );

        dispatch(replace(`/exercises/${targetId}`));
      }
    }, [deleteStatus]);

    return (
      <>
        <DialogHeader onClose={onClose}>
          <Typography>通報の</Typography>
        </DialogHeader>
        <DialogMessage icon={<Warning />}>
          <Typography>通報を削除します。</Typography>
        </DialogMessage>
        <DialogActions>
          <Button icon={<Delete color="error" />} label="削除する" labelColor="error" onClick={onDelete} />
          <Button label="キャンセル" onClick={onClose} />
        </DialogActions>
      </>
    );
  })
);
