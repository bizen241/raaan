import { Comment } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { createPage } from "../../../enhancers/createPage";
import { useBuffers } from "../../../hooks/useBuffers";
import { actions } from "../../../reducers";
import { generateLocalEntityId } from "../../../reducers/entity";
import { ExerciseCommentEditor } from "../../editors/ExerciseCommentEditor";
import { ExerciseCommentList } from "../../lists/exercise-comments/ExerciseCommentList";
import { Button } from "../../ui";

export const ExerciseExerciseCommentsPage = createPage<"Exercise">()(
  React.memo(({ t }) => t("問題集へのコメント")),
  React.memo(({ entityId: exerciseId }) => {
    const dispatch = useDispatch();

    const { bufferIds: exerciseCommentBufferIds, bufferMap: exerciseCommentBufferMap } = useBuffers("ExerciseComment");
    const exerciseCommentId = exerciseCommentBufferIds.find((bufferId) => {
      const buffer = exerciseCommentBufferMap[bufferId];

      return buffer !== undefined && buffer.targetId === exerciseId;
    });

    const onComment = () => {
      dispatch(
        actions.buffers.update("ExerciseComment", generateLocalEntityId(), {
          targetId: exerciseId,
        })
      );
    };

    return (
      <>
        {exerciseCommentId === undefined && <Button icon={<Comment />} label="コメントする" onClick={onComment} />}
        {exerciseCommentId !== undefined && <ExerciseCommentEditor exerciseCommentId={exerciseCommentId} />}
        <ExerciseCommentList
          initialParams={{
            targetId: exerciseId,
          }}
        />
      </>
    );
  })
);
