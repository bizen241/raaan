import { Comment } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { createPage } from "../../../enhancers/createPage";
import { useBuffers } from "../../../hooks/useBuffers";
import { actions } from "../../../reducers";
import { generateLocalEntityId } from "../../../reducers/entity";
import { SuggestionCommentEditor } from "../../editors/SuggestionCommentEditor";
import { SuggestionCommentList } from "../../lists/suggestion-comments/SuggestionCommentList";
import { Button } from "../../ui";

export const SuggestionSuggestionCommentsPage = createPage<"Suggestion">()(
  React.memo(({ t }) => t("提案へのコメント")),
  React.memo(({ entityId: suggestionId }) => {
    const dispatch = useDispatch();

    const { bufferIds: suggestionCommentBufferIds, bufferMap: suggestionCommentBufferMap } = useBuffers(
      "SuggestionComment"
    );
    const suggestionCommentId = suggestionCommentBufferIds.find(bufferId => {
      const buffer = suggestionCommentBufferMap[bufferId];

      return buffer !== undefined && buffer.targetId === suggestionId;
    });

    const onComment = () => {
      dispatch(
        actions.buffers.update("SuggestionComment", generateLocalEntityId(), {
          targetId: suggestionId
        })
      );
    };

    return (
      <>
        {suggestionCommentId === undefined && <Button icon={<Comment />} label="コメントする" onClick={onComment} />}
        {suggestionCommentId !== undefined && <SuggestionCommentEditor bufferId={suggestionCommentId} />}
        <SuggestionCommentList
          initialParams={{
            targetId: suggestionId
          }}
        />
      </>
    );
  })
);
