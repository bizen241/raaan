import { FastRewind, PlayArrow } from "@material-ui/icons";
import * as React from "react";
import { withEntity } from "../../enhancers/withEntity";
import { useToggleState } from "../../hooks/useToggleState";
import { ConfirmRevertDialog } from "../dialogs/revisions/ConfirmRevertDialog";
import { Button, Column } from "../ui";
import { RevisionSummaryViewer } from "./RevisionSummaryViewer";

export const RevisionViewer = withEntity("Revision")(
  React.memo(({ entity: revision }) => {
    const [isRevertDialogOpen, onToggleRevertDialog] = useToggleState();

    return (
      <Column>
        <Button icon={<PlayArrow />} label="プレビュー" />
        <Button icon={<FastRewind />} label="この版に戻す" onClick={onToggleRevertDialog} />
        <RevisionSummaryViewer entityId={revision.summaryId} />
        <ConfirmRevertDialog revision={revision} isOpen={isRevertDialogOpen} onClose={onToggleRevertDialog} />
      </Column>
    );
  })
);
