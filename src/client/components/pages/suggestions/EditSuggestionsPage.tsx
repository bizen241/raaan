import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { SuggestionBufferList } from "../../lists/suggestions/SuggestionBufferList";

export const EditSuggestionsPage = createPage()(
  React.memo(({ t }) => t("未保存の提案")),
  React.memo(() => {
    return <SuggestionBufferList />;
  })
);
