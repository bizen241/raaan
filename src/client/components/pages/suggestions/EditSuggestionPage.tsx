import React from "react";
import { SuggestionEditor } from "../../editors/SuggestionEditor";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";

const EditSuggestionPage = React.memo<PageProps>(({ match }) => {
  const suggestionId = match.params.id;

  return (
    <Page title="提案を編集中">
      <SuggestionEditor bufferId={suggestionId} />
    </Page>
  );
});

export default EditSuggestionPage;
