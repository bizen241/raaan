import { CloudUpload } from "@material-ui/icons";
import React, { useCallback } from "react";
import { ObjectionState } from "../../../shared/api/entities";
import { withBuffer } from "../../enhancers/withBuffer";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useToggleState } from "../../hooks/useToggleState";
import { UploadObjectionDialog } from "../dialogs/objections/UploadObjectionDialog";
import { BrokenBuffer } from "../project/BrokenBuffer";
import { Button, Card, Column, Select, SelectOptions, TextField } from "../ui";

const selectObjectionStateOptions: SelectOptions<ObjectionState> = {
  pending: {
    label: "保留"
  },
  accepted: {
    label: "承認"
  },
  rejected: {
    label: "却下"
  }
};

export const ObjectionEditor = withBuffer("Objection")(
  React.memo(({ bufferType, bufferId, buffer, params, onChange }) => {
    const currentUser = useCurrentUser();

    const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();

    const onUpdateDescription = useCallback((description: string) => {
      onChange({ description });
    }, []);
    const onUpdateState = useCallback((state: ObjectionState) => {
      onChange({ state });
    }, []);
    const onUpdateComment = useCallback((comment: string) => {
      onChange({ comment });
    }, []);

    if (params.targetType === undefined || params.targetId === undefined) {
      return <BrokenBuffer bufferType={bufferType} bufferId={bufferId} />;
    }

    const isOwner = currentUser.permission === "Owner";
    const canUpload = buffer !== undefined;

    return (
      <Column>
        <Button icon={<CloudUpload />} label="アップロード" disabled={!canUpload} onClick={onToggleUploadDialog} />
        {!isOwner ? (
          <Card>
            <TextField label="説明" multiline defaultValue={params.description || ""} onChange={onUpdateDescription} />
          </Card>
        ) : (
          <Card>
            <Select<ObjectionState>
              label="状態"
              options={selectObjectionStateOptions}
              defaultValue={params.state}
              onChange={onUpdateState}
            />
            <TextField label="コメント" multiline defaultValue={params.comment || ""} onChange={onUpdateComment} />
          </Card>
        )}
        <UploadObjectionDialog
          reportId={bufferId}
          targetType={params.targetType}
          targetId={params.targetId}
          isOpen={isUploadDialogOpen}
          onClose={onToggleUploadDialog}
        />
      </Column>
    );
  })
);
