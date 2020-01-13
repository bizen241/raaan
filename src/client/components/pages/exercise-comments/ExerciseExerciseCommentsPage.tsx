import { Comment } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { useBuffers } from "../../../hooks/useBuffers";
import { useEntity } from "../../../hooks/useEntity";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { ExerciseCommentEditor } from "../../editor/ExerciseCommentEditor";
import { ExerciseCommentList } from "../../list/exercise-comments/ExerciseCommentList";
import { PageProps } from "../../project/Router";
import { Button, Page } from "../../ui";

export const ExerciseExerciseCommentsPage = React.memo<PageProps>(props => {
  const exerciseId = props.match.params.id;

  const dispatch = useDispatch();

  const exerciseCommentBuffers = useBuffers("ExerciseComment");
  const exerciseCommentId = Object.keys(exerciseCommentBuffers).find(bufferId => {
    const buffer = exerciseCommentBuffers[bufferId];

    return buffer !== undefined && buffer.targetId === exerciseId;
  });

  const onComment = () => {
    dispatch(
      actions.buffers.update("ExerciseComment", generateBufferId(), {
        targetId: exerciseId
      })
    );
  };

  const { entity: exercise } = useEntity("Exercise", exerciseId);
  if (exercise === undefined) {
    return null;
  }

  return (
    <Page title="問題集へのコメント">
      {exerciseCommentId === undefined && <Button icon={<Comment />} label="コメントする" onClick={onComment} />}
      {exerciseCommentId !== undefined && <ExerciseCommentEditor bufferId={exerciseCommentId} />}
      <ExerciseCommentList
        initialParams={{
          targetId: exerciseId
        }}
      />
    </Page>
  );
});
