import { Comment } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { EntityId } from "../../../../shared/api/entities";
import { useBuffers } from "../../../hooks/useBuffers";
import { useEntity } from "../../../hooks/useEntity";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { SuggestionCommentEditor } from "../../editors/SuggestionCommentEditor";
import { SuggestionCommentList } from "../../lists/suggestion-comments/SuggestionCommentList";
import { Loading } from "../../project/Loading";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";
import { Button } from "../../ui";

export const SuggestionSuggestionCommentsPage = React.memo<PageProps>(props => {
  const suggestionId = props.match.params.id as EntityId<"Suggestion">;

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
      actions.buffers.update("SuggestionComment", generateBufferId(), {
        targetId: suggestionId
      })
    );
  };

  const { entity: suggestion, ...suggestionProps } = useEntity("Suggestion", suggestionId);
  if (suggestion === undefined) {
    return <Loading {...suggestionProps} />;
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
