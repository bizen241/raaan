import { CloudUpload } from "@material-ui/icons";
import React, { useCallback, useContext } from "react";
import { ObjectionState } from "../../../shared/api/entities";
import { withBuffer } from "../../enhancers/withBuffer";
import { useToggleState } from "../../hooks/useToggleState";
import { mergeBuffer } from "../../reducers/buffers";
import { UploadObjectionDialog } from "../dialogs/objections/UploadObjectionDialog";
import { UserContext } from "../project/Context";
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
  React.memo(({ bufferId, buffer, source, onChange }) => {
    const currentUser = useContext(UserContext);

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

    const params = mergeBuffer(source, buffer);
    if (params.targetType === undefined || params.targetId === undefined) {
      return null;
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
