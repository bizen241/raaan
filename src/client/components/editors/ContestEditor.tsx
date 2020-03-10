import { AccessTime, CloudUpload } from "@material-ui/icons";
import React, { useCallback } from "react";
import { EntityId } from "../../../shared/api/entities";
import { useBuffer } from "../../hooks/useBuffer";
import { useToggleState } from "../../hooks/useToggleState";
import { UploadContestDialog } from "../dialogs/contests/UploadContestDialog";
import { Button, Card, Column, DateTimeField } from "../ui";

export const ContestEditor = React.memo<{
  contestId: EntityId<"Contest">;
}>(({ contestId }) => {
  const { buffer, params, onChange } = useBuffer("Contest", contestId);

  const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();

  const onChangeStartAt = useCallback((startAt: number) => onChange({ startAt }), []);
  const onChangeFinishAt = useCallback((finishAt: number) => onChange({ finishAt }), []);

  const canUpload = buffer !== undefined;

  return (
    <Column>
      <Button icon={<CloudUpload />} label="アップロード" disabled={!canUpload} onClick={onToggleUploadDialog} />
      <Card icon={<AccessTime />} title="開始日時">
        <DateTimeField defaultValue={params.startAt || Date.now()} onChange={onChangeStartAt} />
      </Card>
      <Card icon={<AccessTime />} title="終了日時">
        <DateTimeField defaultValue={params.finishAt || Date.now()} onChange={onChangeFinishAt} />
      </Card>
      <UploadContestDialog contestId={contestId} isOpen={isUploadDialogOpen} onClose={onToggleUploadDialog} />
    </Column>
  );
});
