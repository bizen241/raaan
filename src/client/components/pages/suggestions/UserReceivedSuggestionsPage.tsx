import * as React from "react";
import { SuggestionSummaryList } from "../../list/suggestion-summaries/SuggestionSummaryList";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui";

export const UserReceivedSuggestionsPage = React.memo<PageProps>(props => {
  const userId = props.match.params.id;

  return (
    <Page title="受信した提案">
      <SuggestionSummaryList
        initialParams={{
          exerciseAuthorId: userId
        }}
      />
    </Page>
  );
});
