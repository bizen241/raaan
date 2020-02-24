import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { SuggestionViewer } from "../../viewers/SuggestionViewer";

export const SuggestionPage = createPage<"Suggestion">()(
  React.memo(({ t }) => t("提案の詳細")),
  React.memo(({ entityId: suggestionId }) => {
    return <SuggestionViewer entityId={suggestionId} />;
  })
);
