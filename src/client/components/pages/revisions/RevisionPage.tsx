import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { useEntity } from "../../../hooks/useEntity";
import { Loading } from "../../project/Loading";
import { RevisionViewer } from "../../viewers/RevisionViewer";

export const RevisionPage = createPage()(
  React.memo(({ t }) => t("編集履歴の詳細")),
  React.memo(props => {
    const revisionId = props.match.params.id;

    const { entity: revision, ...revisionProps } = useEntity("Revision", revisionId);
    if (revision === undefined) {
      return <Loading {...revisionProps} />;
    }

    return <RevisionViewer revision={revision} />;
  })
);
