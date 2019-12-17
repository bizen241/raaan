import { CloudUpload } from "@material-ui/icons";
import { replace } from "connected-react-router";
import * as React from "react";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { useEntity } from "../../../hooks/useEntity";
import { actions } from "../../../reducers";
import { isNumber } from "../../../reducers/buffers";
import { UserContext } from "../../project/Context";
import { Button, Card, DialogContent, Select, SelectOptions } from "../../ui";

type UploadType = "public" | "private" | "update" | "draft";

export const UploadExerciseDraftDialog = createDialog<{
  exerciseDraftId: string;
  exerciseId: string | undefined;
}>(
  React.memo(({ exerciseDraftId, exerciseId, onClose }) => {
    const dispatch = useDispatch();
    const currentUser = useContext(UserContext);

    const { entity: exercise } = useEntity("Exercise", exerciseId);

    const isReadOnly = currentUser.permission === "Read";
    const isLocalOnly = isNumber(exerciseDraftId);
    const isDraft = isLocalOnly ? true : exercise && exercise.isDraft;

    const [uploadType, setUploadConfig] = useState<UploadType>(!isDraft ? "update" : isReadOnly ? "private" : "public");

    const onUpload = () => {
      dispatch(
        actions.buffers.update("ExerciseDraft", exerciseDraftId, {
          isMerged: uploadType === "draft" ? false : undefined,
          isPrivate: uploadType === "public" ? false : undefined
        })
      );
      dispatch(
        actions.api.upload("ExerciseDraft", exerciseDraftId, undefined, uploadResponse => {
          const newExerciseId = Object.keys(uploadResponse.Exercise)[0];

          dispatch(replace(`/exercises/${newExerciseId}`));
        })
      );
    };

    const selectUploadTypeOptions: SelectOptions<UploadType> = {
      public: {
        label: "公開",
        disabled: isReadOnly,
        hidden: !isDraft
      },
      private: {
        label: "非公開",
        hidden: !isDraft
      },
      update: {
        label: "更新",
        hidden: isDraft
      },
      draft: {
        label: "下書き"
      }
    };

    const canUpload = exerciseId !== undefined ? exercise !== undefined : true;

    return (
      <DialogContent title="問題集をアップロード" onClose={onClose}>
        <Card>
          <Select<UploadType>
            label="設定"
            options={selectUploadTypeOptions}
            defaultValue={uploadType}
            onChange={value => setUploadConfig(value)}
          />
        </Card>
        <Button disabled={!canUpload} color="primary" icon={<CloudUpload />} label="アップロード" onClick={onUpload} />
      </DialogContent>
    );
  })
);
