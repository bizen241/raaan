import { CloudUpload } from "@material-ui/icons";
import { replace } from "connected-react-router";
import * as React from "react";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { isLocalOnly } from "../../../reducers/api";
import { UserContext } from "../../project/Context";
import { Button, Card, DialogContent2, Select } from "../../ui";

type UploadType = "public" | "private" | "update" | "draft";

export const UploadExerciseDraftDialog = createDialog<{
  exerciseDraftId: string;
}>(
  React.memo(({ exerciseDraftId, onClose }) => {
    const dispatch = useDispatch();
    const currentUser = useContext(UserContext);

    const [uploadConfig, setUploadConfig] = useState<UploadType>(isLocalOnly(exerciseDraftId) ? "public" : "update");

    const onUpload = () => {
      dispatch(
        actions.buffers.update("ExerciseDraft", exerciseDraftId, {
          isMerged: uploadConfig === "draft" ? false : undefined,
          isPrivate: uploadConfig === "public" ? false : undefined
        })
      );
      dispatch(
        actions.api.upload("ExerciseDraft", exerciseDraftId, undefined, uploadResponse => {
          const exerciseId = Object.keys(uploadResponse.Exercise)[0];

          dispatch(replace(`/exercises/${exerciseId}`));
        })
      );
    };

    const canUploadAsPublic = isLocalOnly(exerciseDraftId) && currentUser.permission !== "Read";
    const canUploadAsPrivate = isLocalOnly(exerciseDraftId);
    const canUpdate = !isLocalOnly(exerciseDraftId);

    return (
      <DialogContent2 title="問題集をアップロード" onClose={onClose}>
        <Card icon={<CloudUpload />} title="問題集をアップロード">
          <Select
            label="設定"
            defaultValue={uploadConfig}
            onChange={e => setUploadConfig(e.target.value as UploadType)}
          >
            {canUploadAsPublic && <option value="public">公開</option>}
            {canUploadAsPrivate && <option value="private">非公開</option>}
            {canUpdate && <option value="update">更新</option>}
            <option value="draft">下書き</option>
          </Select>
        </Card>
        <Button color="primary" label="アップロード" onClick={onUpload} />
      </DialogContent2>
    );
  })
);
