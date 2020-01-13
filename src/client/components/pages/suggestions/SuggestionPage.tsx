import React from "react";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui/Page";
import { SuggestionViewer } from "../../viewer/SuggestionViewer";

export const SuggestionPage = React.memo<PageProps>(props => {
  const suggestionId = props.match.params.id;

  return (
    <Page title="提案の詳細">
      <SuggestionViewer entityId={suggestionId} />
    </Page>
  );
});
