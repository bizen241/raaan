import React from "react";
import { SuggestionSummaryList } from "../../lists/suggestion-summaries/SuggestionSummaryList";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";

export const UserUploadedSuggestionsPage = React.memo<PageProps>(props => {
  const userId = props.match.params.id;

  return (
    <Page title="送信した提案">
      <SuggestionSummaryList
        initialParams={{
          authorId: userId
        }}
      />
    </Page>
  );
});
