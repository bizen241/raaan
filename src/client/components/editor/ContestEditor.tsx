import { AccessTime, CloudUpload } from "@material-ui/icons";
import React, { useCallback } from "react";
import { withBuffer } from "../../enhancers/withBuffer";
import { useToggleState } from "../../hooks/useToggleState";
import { mergeBuffer } from "../../reducers/buffers";
import { UploadContestDialog } from "../dialogs/contests/UploadContestDialog";
import { Button, Card, Column, DateTimeField } from "../ui";

export const ContestEditor = withBuffer("Contest")(
  React.memo(({ bufferId, buffer, source, onChange }) => {
    const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();

    const onChangeStartAt = useCallback((startAt: number) => onChange({ startAt }), []);
    const onChangeFinishAt = useCallback((finishAt: number) => onChange({ finishAt }), []);

    const canUpload = buffer !== undefined;

    const params = mergeBuffer(source, buffer);

    return (
      <Column>
        <Button icon={<CloudUpload />} label="アップロード" disabled={!canUpload} onClick={onToggleUploadDialog} />
        <Card icon={<AccessTime />} title="開始日時">
          <DateTimeField defaultValue={params.startAt || Date.now()} onChange={onChangeStartAt} />
        </Card>
        <Card icon={<AccessTime />} title="終了日時">
          <DateTimeField defaultValue={params.finishAt || Date.now()} onChange={onChangeFinishAt} />
        </Card>
        <UploadContestDialog contestId={bufferId} isOpen={isUploadDialogOpen} onClose={onToggleUploadDialog} />
      </Column>
    );
  })
);
