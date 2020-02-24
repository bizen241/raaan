import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { SuggestionSummaryList } from "../../lists/suggestion-summaries/SuggestionSummaryList";

export const UserUploadedSuggestionsPage = createPage<"User">()(
  React.memo(({ t }) => t("送信した提案")),
  React.memo(({ entityId: userId }) => {
    return (
      <SuggestionSummaryList
        initialParams={{
          authorId: userId
        }}
      />
    );
  })
);
