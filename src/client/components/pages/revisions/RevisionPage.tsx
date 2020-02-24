import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { useEntity } from "../../../hooks/useEntity";
import { RevisionViewer } from "../../viewers/RevisionViewer";

export const RevisionPage = createPage<"Revision">()(
  React.memo(({ t }) => t("編集履歴の詳細")),
  React.memo(({ entityId: revisionId }) => {
    const { entity: revision } = useEntity("Revision", revisionId);

    return <RevisionViewer revision={revision} />;
  })
);
