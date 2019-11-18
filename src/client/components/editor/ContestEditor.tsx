import { AccessTime, CloudUpload } from "@material-ui/icons";
import * as React from "react";
import { useCallback } from "react";
import { Contest } from "../../../shared/api/entities";
import { withBuffer } from "../../enhancers/withBuffer";
import { useToggleState } from "../../hooks/useToggleState";
import { UploadContestDialog } from "../dialogs/contests/UploadContestDialog";
import { Button, Card, Column, DateTimeField } from "../ui";

export const ContestEditor = withBuffer<Contest>("Contest")(
  React.memo(props => {
    const { bufferId, buffer = {}, source = {}, onChange } = props;

    const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();

    const onChangeStartAt = useCallback((startAt: number) => onChange({ startAt }), []);
    const onChangeFinishAt = useCallback((finishAt: number) => onChange({ finishAt }), []);

    const canUpload = props.buffer !== undefined;

    return (
      <Column>
        <Button icon={<CloudUpload />} label="アップロード" disabled={!canUpload} onClick={onToggleUploadDialog} />
        <Card icon={<AccessTime />} title="開始日時">
          <DateTimeField defaultValue={buffer.startAt || source.startAt || Date.now()} onChange={onChangeStartAt} />
        </Card>
        <Card icon={<AccessTime />} title="終了日時">
          <DateTimeField defaultValue={buffer.finishAt || source.finishAt || Date.now()} onChange={onChangeFinishAt} />
        </Card>
        <UploadContestDialog contestId={bufferId} isOpen={isUploadDialogOpen} onClose={onToggleUploadDialog} />
      </Column>
    );
  })
);
