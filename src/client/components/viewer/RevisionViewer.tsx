import { PlayArrow } from "@material-ui/icons";
import * as React from "react";
import { withEntity } from "../../enhancers/withEntity";
import { Button, Column } from "../ui";
import { RevisionSummaryViewer } from "./RevisionSummaryViewer";

export const RevisionViewer = withEntity("Revision")(
  React.memo(({ entity: revision }) => {
    return (
      <Column>
        <Button color="primary" icon={<PlayArrow />} label="プレビュー" />
        <RevisionSummaryViewer entityId={revision.summaryId} />
      </Column>
    );
  })
);
