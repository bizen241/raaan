import React from "react";
import { SuggestionBufferList } from "../../list/suggestions/SuggestionBufferList";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui/Page";

export const EditSuggestionsPage = React.memo<PageProps>(() => {
  return (
    <Page title="未保存の提案">
      <SuggestionBufferList />
    </Page>
  );
});
