import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { RevisionEditor } from "../../editors/RevisionEditor";

export const EditRevisionPage = createPage<"Revision">()(
  React.memo(({ t }) => t("編集履歴を編集中")),
  React.memo(({ entityId: revisionId }) => {
    return <RevisionEditor revisionId={revisionId} />;
  })
);
