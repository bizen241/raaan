import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { ObjectionEditor } from "../../editors/ObjectionEditor";

export const EditObjectionPage = createPage<"Objection">()(
  React.memo(({ t }) => t("抗議を編集中")),
  React.memo(({ entityId: objectionId }) => {
    return <ObjectionEditor bufferId={objectionId} />;
  })
);
