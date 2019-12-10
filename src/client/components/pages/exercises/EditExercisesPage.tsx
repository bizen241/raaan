import { Add, Edit } from "@material-ui/icons";
import { push } from "connected-react-router";
import * as React from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { generateBufferId } from "../../../reducers/buffers";
import { ExerciseDraftBufferList } from "../../list/exercise-drafts/ExerciseDraftBufferList";
import { Button, Column, Page } from "../../ui";

export const EditExercisesPage = React.memo(() => {
  const dispatch = useDispatch();

  const onCreate = useCallback(() => {
    const bufferId = generateBufferId();

    dispatch(push(`/exercises/${bufferId}/edit`));
  }, []);

  return (
    <Page title="未保存の問題集">
      <Button icon={<Add />} label="新しい問題集を作る" color="primary" onClick={onCreate} />
      <Button icon={<Edit />} label="保存された下書き" to={`/user/drafts`} />
      <Column pb={1}>
        <ExerciseDraftBufferList />
      </Column>
    </Page>
  );
});
