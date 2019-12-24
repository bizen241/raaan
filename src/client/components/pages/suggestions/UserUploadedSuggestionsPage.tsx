import * as React from "react";
import { SuggestionSummaryList } from "../../list/suggestion-summaries/SuggestionSummaryList";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui";

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
