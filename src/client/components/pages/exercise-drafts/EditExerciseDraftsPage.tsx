import { Add, Edit, InsertDriveFile } from "@material-ui/icons";
import { push } from "connected-react-router";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { createPage } from "../../../enhancers/createPage";
import { useToggleState } from "../../../hooks/useToggleState";
import { generateLocalEntityId } from "../../../reducers/entity";
import { ImportExerciseDraftDialog } from "../../dialogs/exercise-drafts/ImportExerciseDraftDialog";
import { ExerciseDraftBufferList } from "../../lists/exercise-drafts/ExerciseDraftBufferList";
import { Button, Column } from "../../ui";

export const EditExerciseDraftsPage = createPage()(
  React.memo(({ t }) => t("未保存の問題集")),
  React.memo(() => {
    const dispatch = useDispatch();

    const [isImportDialogOpen, onToggleImportDialog] = useToggleState();

    const onCreate = useCallback(() => {
      const bufferId = generateLocalEntityId<"ExerciseDraft">();

      dispatch(push(`/exercise-darfts/${bufferId}/edit`));
    }, []);

    return (
      <>
        <Button icon={<Add />} label="新しい問題集を作る" color="primary" onClick={onCreate} />
        <Button icon={<InsertDriveFile />} label="問題集をインポート" onClick={onToggleImportDialog} />
        <Button icon={<Edit />} label="保存された下書き" to={`/user/drafts`} />
        <Column pb={1}>
          <ExerciseDraftBufferList />
        </Column>
        <ImportExerciseDraftDialog isOpen={isImportDialogOpen} onClose={onToggleImportDialog} />
      </>
    );
  })
);
