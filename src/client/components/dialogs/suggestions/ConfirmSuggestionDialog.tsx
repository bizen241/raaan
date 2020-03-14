import { Edit, WbIncandescent } from "@material-ui/icons";
import { push } from "connected-react-router";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Exercise } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { useBuffers } from "../../../hooks/useBuffers";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useSearch } from "../../../hooks/useSearch";
import { actions } from "../../../reducers";
import { generateLocalEntityId } from "../../../reducers/entity";
import { Button } from "../../ui";

export const ConfirmSuggestionDialog = createDialog<{
  exercise: Exercise;
}>()(
  React.memo(({ t }) => t("変更を提案する")),
  React.memo(({ exercise }) => {
    const dispatch = useDispatch();
    const { currentUser } = useCurrentUser();

    const { entities: suggestionSummaries } = useSearch("SuggestionSummary", {
      authorId: currentUser.id,
      exerciseId: exercise.id,
      state: "pending"
    });
    const suggestionSummary = suggestionSummaries[0];

    const { bufferIds: suggestionBufferIds, bufferMap: suggestionBufferMap } = useBuffers("Suggestion");
    const suggestionBufferId = suggestionBufferIds.find(bufferId => {
      const buffer = suggestionBufferMap[bufferId];

      return buffer && buffer.exerciseId === exercise.id;
    });

    const suggestionId = (suggestionSummary && suggestionSummary.suggestionId) || suggestionBufferId;

    if (suggestionId !== undefined) {
      return <Button icon={<Edit />} label="編集する" to={`/suggestions/${suggestionId}/edit`} />;
    }

    const onCreate = useCallback(() => {
      const bufferId = generateLocalEntityId<"Suggestion">();

      dispatch(
        actions.buffers.update("Suggestion", bufferId, {
          title: exercise.title,
          tags: exercise.tags,
          description: exercise.description,
          questions: exercise.questions,
          exerciseId: exercise.id,
          revisionId: exercise.latestId
        })
      );
      dispatch(push(`/suggestions/${bufferId}/edit`));
    }, []);

    return <Button icon={<WbIncandescent />} label="変更を提案する" onClick={onCreate} />;
  })
);
