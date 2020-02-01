import { FastRewind, PlayArrow } from "@material-ui/icons";
import React from "react";
import { Revision } from "../../../shared/api/entities";
import { useEntity } from "../../hooks/useEntity";
import { useToggleState } from "../../hooks/useToggleState";
import { ConfirmRevertDialog } from "../dialogs/revisions/ConfirmRevertDialog";
import { Loading } from "../project/Loading";
import { Button, Column } from "../ui";
import { RevisionSummaryViewer } from "./RevisionSummaryViewer";

export const RevisionViewer = React.memo<{
  revision: Revision;
}>(({ revision }) => {
  const [isRevertDialogOpen, onToggleRevertDialog] = useToggleState();

  const { entity: revisionSummary, ...revisionSummaryProps } = useEntity("RevisionSummary", revision.summaryId);
  if (revisionSummary === undefined) {
    return <Loading {...revisionSummaryProps} />;
  }

  return (
    <Column>
      <Button icon={<PlayArrow />} label="プレビュー" />
      <Button icon={<FastRewind />} label="この版に戻す" onClick={onToggleRevertDialog} />
      <RevisionSummaryViewer revision={revision} revisionSummary={revisionSummary} />
      <ConfirmRevertDialog revision={revision} isOpen={isRevertDialogOpen} onClose={onToggleRevertDialog} />
    </Column>
  );
});
