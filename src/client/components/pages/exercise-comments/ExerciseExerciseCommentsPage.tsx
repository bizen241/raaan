import { Comment } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { createPage } from "../../../enhancers/createPage";
import { useBuffers } from "../../../hooks/useBuffers";
import { useEntity } from "../../../hooks/useEntity";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { ExerciseCommentEditor } from "../../editors/ExerciseCommentEditor";
import { ExerciseCommentList } from "../../lists/exercise-comments/ExerciseCommentList";
import { Loading } from "../../project/Loading";
import { Button } from "../../ui";

export const ExerciseExerciseCommentsPage = createPage()(
  React.memo(({ t }) => t("問題集へのコメント")),
  React.memo(props => {
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

    const { entity: exercise, ...exerciseProps } = useEntity("Exercise", exerciseId);
    if (exercise === undefined) {
      return <Loading {...exerciseProps} />;
    }

    return (
      <>
        {exerciseCommentId === undefined && <Button icon={<Comment />} label="コメントする" onClick={onComment} />}
        {exerciseCommentId !== undefined && <ExerciseCommentEditor bufferId={exerciseCommentId} />}
        <ExerciseCommentList
          initialParams={{
            targetId: exerciseId
          }}
        />
      </>
    );
  })
);
