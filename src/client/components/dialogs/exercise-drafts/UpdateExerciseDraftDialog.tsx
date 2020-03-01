import { CloudUpload } from "@material-ui/icons";
import { replace } from "connected-react-router";
import React from "react";
import { useDispatch } from "react-redux";
import { EntityId, ExerciseDraft } from "../../../../shared/api/entities";
import { Params } from "../../../../shared/api/request/params";
import { createDialog } from "../../../enhancers/createDialog";
import { useEntity } from "../../../hooks/useEntity";
import { actions } from "../../../reducers";
import { ExerciseDraftUploadEditor } from "../../editors/ExerciseDraftUploadEditor";
import { Loading } from "../../project/Loading";
import { Button } from "../../ui";

export const UpdateExerciseDraftDialog = createDialog<{
  exerciseDraftId: EntityId<"ExerciseDraft">;
  exerciseDraft: Params<ExerciseDraft>;
  exerciseId: EntityId<"Exercise">;
  onChange: (exerciseDraft: Partial<ExerciseDraft>) => void;
}>()(
  React.memo(({ t }) => t("問題集をアップロード")),
  React.memo(({ exerciseDraftId, exerciseDraft, exerciseId, onChange }) => {
    const dispatch = useDispatch();

    const { entity: exercise, ...exerciseProps } = useEntity("Exercise", exerciseId);
    if (exercise === undefined) {
      return <Loading {...exerciseProps} />;
    }

    const onUpload = () => {
      dispatch(
        actions.api.upload("ExerciseDraft", exerciseDraftId, undefined, () =>
          dispatch(replace(`/exercises/${exerciseId}`))
        )
      );
    };

    return (
      <>
        <ExerciseDraftUploadEditor
          bufferId={exerciseDraftId}
          params={exerciseDraft}
          exercise={exercise}
          onChange={onChange}
        />
        <Button color="primary" icon={<CloudUpload />} label="アップロード" onClick={onUpload} />
      </>
    );
  })
);
