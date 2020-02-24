import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { SynonymViewer } from "../../viewers/SynonymViewer";

export const SynonymPage = createPage<"Synonym">()(
  React.memo(({ t }) => t("タグの別名の詳細")),
  React.memo(({ entityId: synonymId }) => {
    return <SynonymViewer entityId={synonymId} />;
  })
);
