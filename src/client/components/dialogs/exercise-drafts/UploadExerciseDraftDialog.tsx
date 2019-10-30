import { CloudUpload } from "@material-ui/icons";
import { replace } from "connected-react-router";
import * as React from "react";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { isNumber } from "../../../reducers/buffers";
import { UserContext } from "../../project/Context";
import { Button, Card, DialogContent, Select } from "../../ui";

type UploadType = "public" | "private" | "update" | "draft";

export const UploadExerciseDraftDialog = createDialog<{
  exerciseDraftId: string;
}>(
  React.memo(({ exerciseDraftId, onClose }) => {
    const dispatch = useDispatch();
    const currentUser = useContext(UserContext);

    const isLocalOnly = isNumber(exerciseDraftId);
    const isReadOnly = currentUser.permission === "Read";

    const [uploadType, setUploadConfig] = useState<UploadType>(
      !isLocalOnly ? "update" : isReadOnly ? "private" : "public"
    );

    const onUpload = () => {
      dispatch(
        actions.buffers.update("ExerciseDraft", exerciseDraftId, {
          isMerged: uploadType === "draft" ? false : undefined,
          isPrivate: uploadType === "public" ? false : undefined
        })
      );
      dispatch(
        actions.api.upload("ExerciseDraft", exerciseDraftId, undefined, uploadResponse => {
          const exerciseId = Object.keys(uploadResponse.Exercise)[0];

          dispatch(replace(`/exercises/${exerciseId}`));
        })
      );
    };

    return (
      <DialogContent title="問題集をアップロード" onClose={onClose}>
        <Card icon={<CloudUpload />} title="問題集をアップロード">
          <Select label="設定" defaultValue={uploadType} onChange={e => setUploadConfig(e.target.value as UploadType)}>
            {isLocalOnly && (
              <option value="public" disabled={isReadOnly}>
                公開
              </option>
            )}
            {isLocalOnly && <option value="private">非公開</option>}
            {!isLocalOnly && <option value="update">更新</option>}
            <option value="draft">下書き</option>
          </Select>
        </Card>
        <Button color="primary" label="アップロード" onClick={onUpload} />
      </DialogContent>
    );
  })
);
