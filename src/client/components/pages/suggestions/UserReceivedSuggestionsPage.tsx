import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { SuggestionSummaryList } from "../../lists/suggestion-summaries/SuggestionSummaryList";

export const UserReceivedSuggestionsPage = createPage<"User">()(
  React.memo(({ t }) => t("受信した提案")),
  React.memo(({ entityId: userId }) => {
    return (
      <SuggestionSummaryList
        initialParams={{
          exerciseAuthorId: userId,
        }}
      />
    );
  })
);
