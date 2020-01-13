import { Comment } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { useBuffers } from "../../../hooks/useBuffers";
import { useEntity } from "../../../hooks/useEntity";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { SuggestionCommentEditor } from "../../editor/SuggestionCommentEditor";
import { SuggestionCommentList } from "../../list/suggestion-comments/SuggestionCommentList";
import { PageProps } from "../../project/Router";
import { Button, Page } from "../../ui";

export const SuggestionSuggestionCommentsPage = React.memo<PageProps>(props => {
  const suggestionId = props.match.params.id;

  const dispatch = useDispatch();

  const suggestionCommentBuffers = useBuffers("SuggestionComment");
  const suggestionCommentId = Object.keys(suggestionCommentBuffers).find(bufferId => {
    const buffer = suggestionCommentBuffers[bufferId];

    return buffer !== undefined && buffer.targetId === suggestionId;
  });

  const onComment = () => {
    dispatch(
      actions.buffers.update("SuggestionComment", generateBufferId(), {
        targetId: suggestionId
      })
    );
  };

  const { entity: suggestion } = useEntity("Suggestion", suggestionId);
  if (suggestion === undefined) {
    return null;
  }

  return (
    <Page title="提案へのコメント">
      {suggestionCommentId === undefined && <Button icon={<Comment />} label="コメントする" onClick={onComment} />}
      {suggestionCommentId !== undefined && <SuggestionCommentEditor bufferId={suggestionCommentId} />}
      <SuggestionCommentList
        initialParams={{
          targetId: suggestionId
        }}
      />
    </Page>
  );
});
