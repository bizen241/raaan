import React from "react";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";
import { SuggestionViewer } from "../../viewers/SuggestionViewer";

export const SuggestionPage = React.memo<PageProps>(props => {
  const suggestionId = props.match.params.id;

  return (
    <Page title="提案の詳細">
      <SuggestionViewer entityId={suggestionId} />
    </Page>
  );
});
