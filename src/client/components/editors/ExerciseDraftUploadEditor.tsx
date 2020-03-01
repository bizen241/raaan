import { Message } from "@material-ui/icons";
import React, { useCallback, useState } from "react";
import { EntityId, Exercise, ExerciseDraft } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { isLocalEntityId } from "../../reducers/entity";
import { Card, Select, SelectOptions, TextField } from "../ui";

type UploadType = "public" | "private" | "update" | "draft";

export const ExerciseDraftUploadEditor = React.memo<{
  bufferId: EntityId<"ExerciseDraft">;
  exercise: Exercise | undefined;
  params: Params<ExerciseDraft>;
  onChange: (exerciseDraft: Partial<ExerciseDraft>) => void;
}>(({ bufferId, exercise, params, onChange }) => {
  const { currentUser } = useCurrentUser();

  const isReadOnly = currentUser.permission === "Read";
  const isDraft = isLocalEntityId(bufferId) ? true : exercise && exercise.isDraft;

  const [uploadType, setUploadConfig] = useState<UploadType>(!isDraft ? "update" : isReadOnly ? "private" : "public");

  const onUpdateUploadType = useCallback((nextUploadType: UploadType) => {
    onChange({
      isMerged: nextUploadType === "draft" ? false : undefined,
      isPrivate: nextUploadType === "public" ? false : undefined
    });
    setUploadConfig(nextUploadType);
  }, []);
  const onUpdateMessageSubject = useCallback((messageSubject: string) => onChange({ messageSubject }), []);
  const onUpdateMessageBody = useCallback((messageBody: string) => onChange({ messageBody }), []);

  const selectUploadTypeOptions: SelectOptions<UploadType> = {
    public: {
      label: "公開",
      disabled: isReadOnly,
      hidden: !isDraft
    },
    private: {
      label: "非公開",
      hidden: !isDraft
    },
    update: {
      label: "更新",
      hidden: isDraft
    },
    draft: {
      label: "下書き"
    }
  };

  return (
    <>
      <Card>
        <Select<UploadType>
          label="設定"
          options={selectUploadTypeOptions}
          defaultValue={uploadType}
          onChange={onUpdateUploadType}
        />
      </Card>
      {uploadType !== "draft" && (
        <Card icon={<Message />} title="メッセージ">
          <TextField label="件名" defaultValue={params.messageSubject || ""} onChange={onUpdateMessageSubject} />
          <TextField label="本文" multiline defaultValue={params.messageBody || ""} onChange={onUpdateMessageBody} />
        </Card>
      )}
    </>
  );
});
