import { CloudUpload } from "@material-ui/icons";
import { replace } from "connected-react-router";
import React from "react";
import { useDispatch } from "react-redux";
import { ExerciseDraft } from "../../../../shared/api/entities";
import { Params } from "../../../../shared/api/request/params";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { ExerciseDraftUploadEditor } from "../../editors/ExerciseDraftUploadEditor";
import { Button } from "../../ui";

export const PostExerciseDraftDialog = createDialog<{
  exerciseDraftId: string;
  exerciseDraft: Params<ExerciseDraft>;
  onChange: (exerciseDraft: Partial<ExerciseDraft>) => void;
}>()(
  React.memo(({ t }) => t("問題集をアップロード")),
  React.memo(({ exerciseDraftId, exerciseDraft, onChange }) => {
    const dispatch = useDispatch();

    const onUpload = () => {
      dispatch(
        actions.api.upload("ExerciseDraft", exerciseDraftId, undefined, uploadResponse => {
          const newExerciseId = Object.keys(uploadResponse.Exercise)[0];

          dispatch(replace(`/exercises/${newExerciseId}`));
        })
      );
    };

    return (
      <>
        <ExerciseDraftUploadEditor
          bufferId={exerciseDraftId}
          exercise={undefined}
          params={exerciseDraft}
          onChange={onChange}
        />
        <Button color="primary" icon={<CloudUpload />} label="アップロード" onClick={onUpload} />
      </>
    );
  })
);
