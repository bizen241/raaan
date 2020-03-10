import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { SuggestionEditor } from "../../editors/SuggestionEditor";

const EditSuggestionPage = createPage<"Suggestion">()(
  React.memo(({ t }) => t("提案を編集中")),
  React.memo(({ entityId: suggestionId }) => {
    return <SuggestionEditor suggestionId={suggestionId} />;
  })
);

export default EditSuggestionPage;
