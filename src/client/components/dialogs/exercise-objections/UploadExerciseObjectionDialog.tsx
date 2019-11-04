import { Typography } from "@material-ui/core";
import { CloudUpload, Warning } from "@material-ui/icons";
import { replace } from "connected-react-router";
import { useContext } from "react";
import * as React from "react";
import { useDispatch } from "react-redux";
import { ExerciseObjection } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { UserContext } from "../../project/Context";
import { Button, Card, DialogContent } from "../../ui";

export const UploadExerciseObjectionDialog = createDialog<{
  reportId: string;
  targetId: string;
}>(
  React.memo(({ reportId, targetId, onClose }) => {
    const dispatch = useDispatch();
    const currentUser = useContext(UserContext);

    const onUpload = () => {
      dispatch(
        actions.api.upload<ExerciseObjection>("ExerciseObjection", reportId, undefined, uploadResponse => {
          dispatch(
            actions.cache.add<ExerciseObjection>(
              "ExerciseObjection",
              {
                objectorId: currentUser.id,
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
        <Button icon={<CloudUpload />} label="報告をアップロード" onClick={onUpload} />
      </DialogContent>
    );
  })
);
