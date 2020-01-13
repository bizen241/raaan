import { Add, Edit, InsertDriveFile } from "@material-ui/icons";
import { push } from "connected-react-router";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useToggleState } from "../../../hooks/useToggleState";
import { generateBufferId } from "../../../reducers/buffers";
import { ImportExerciseDraftDialog } from "../../dialogs/exercise-drafts/ImportExerciseDraftDialog";
import { ExerciseDraftBufferList } from "../../list/exercise-drafts/ExerciseDraftBufferList";
import { Button, Column, Page } from "../../ui";

export const EditExercisesPage = React.memo(() => {
  const dispatch = useDispatch();

  const [isImportDialogOpen, onToggleImportDialog] = useToggleState();

  const onCreate = useCallback(() => {
    const bufferId = generateBufferId();

    dispatch(push(`/exercises/${bufferId}/edit`));
  }, []);

  return (
    <Page title="未保存の問題集">
      <Button icon={<Add />} label="新しい問題集を作る" color="primary" onClick={onCreate} />
      <Button icon={<InsertDriveFile />} label="問題集をインポート" onClick={onToggleImportDialog} />
      <Button icon={<Edit />} label="保存された下書き" to={`/user/drafts`} />
      <Column pb={1}>
        <ExerciseDraftBufferList />
      </Column>
      <ImportExerciseDraftDialog isOpen={isImportDialogOpen} onClose={onToggleImportDialog} />
    </Page>
  );
});
