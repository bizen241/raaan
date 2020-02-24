import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { SynonymList } from "../../lists/synonyms/SynonymList";

export const SynonymsPage = createPage()(
  React.memo(({ t }) => t("タグの別名を探す")),
  React.memo(() => {
    return <SynonymList initialParams={{}} />;
  })
);
