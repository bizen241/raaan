import React from "react";
import { EntityId } from "../../../../shared/api/entities";
import { SuggestionSummaryList } from "../../lists/suggestion-summaries/SuggestionSummaryList";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";

export const UserUploadedSuggestionsPage = React.memo<PageProps>(props => {
  const userId = props.match.params.id as EntityId<"User">;

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
