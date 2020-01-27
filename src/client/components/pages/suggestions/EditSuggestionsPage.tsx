import React from "react";
import { SuggestionBufferList } from "../../lists/suggestions/SuggestionBufferList";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";

export const EditSuggestionsPage = React.memo<PageProps>(() => {
  return (
    <Page title="未保存の提案">
      <SuggestionBufferList />
    </Page>
  );
});
