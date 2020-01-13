import React from "react";
import { SuggestionEditor } from "../../editor/SuggestionEditor";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui/Page";

const EditSuggestionPage = React.memo<PageProps>(({ match }) => {
  const suggestionId = match.params.id;

  return (
    <Page title="提案を編集中">
      <SuggestionEditor bufferId={suggestionId} />
    </Page>
  );
});

export default EditSuggestionPage;
