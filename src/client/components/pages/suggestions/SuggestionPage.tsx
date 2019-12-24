import * as React from "react";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui/Page";
import { SuggestionViewer } from "../../viewer/SuggestionViewer";

export const SuggestionPage = React.memo<PageProps>(props => {
  const suggestionId = props.match.params.id;

  return (
    <Page title="編集履歴の詳細">
      <SuggestionViewer entityId={suggestionId} />
    </Page>
  );
});
