import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { ObjectionViewer } from "../../viewers/ObjectionViewer";

export const ObjectionPage = createPage<"Objection">()(
  React.memo(({ t }) => t("抗議の詳細")),
  React.memo(({ entityId: objectionId }) => {
    return <ObjectionViewer objectionId={objectionId} />;
  })
);
