import { CloudUpload } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useContext } from "react";
import { Objection, ObjectionState } from "../../../shared/api/entities";
import { withBuffer } from "../../enhancers/withBuffer";
import { useToggleState } from "../../hooks/useToggleState";
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

export const ObjectionEditor = withBuffer<Objection>("Objection")(
  React.memo(props => {
    const { bufferId, buffer = {}, source = {}, onChange } = props;

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

    const targetType = source.targetType || buffer.targetType;
    const targetId = source.targetId || buffer.targetId;
    if (targetType === undefined || targetId === undefined) {
      return null;
    }

    const isOwner = currentUser.permission === "Owner";
    const canUpload = !isOwner ? buffer.description !== undefined : buffer.state !== undefined;

    return (
      <Column>
        <Button icon={<CloudUpload />} label="アップロード" disabled={!canUpload} onClick={onToggleUploadDialog} />
        {!isOwner ? (
          <Card>
            <TextField
              label="説明"
              multiline
              defaultValue={buffer.description || source.description || ""}
              onChange={onUpdateDescription}
            />
          </Card>
        ) : (
          <Card>
            <Select<ObjectionState>
              label="状態"
              options={selectObjectionStateOptions}
              defaultValue={buffer.state || source.state}
              onChange={onUpdateState}
            />
            <TextField
              label="コメント"
              multiline
              defaultValue={buffer.comment || source.comment || ""}
              onChange={onUpdateComment}
            />
          </Card>
        )}
        <UploadObjectionDialog
          reportId={bufferId}
          targetType={targetType}
          targetId={targetId}
          isOpen={isUploadDialogOpen}
          onClose={onToggleUploadDialog}
        />
      </Column>
    );
  })
);
