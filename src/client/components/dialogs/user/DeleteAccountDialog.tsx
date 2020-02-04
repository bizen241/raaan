import { Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React, { useCallback, useState } from "react";
import { deleteCurrentUser } from "../../../api/client";
import { createDialog } from "../../../enhancers/createDialog";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { Button, Card, TextField } from "../../ui";

export const DeleteAccountDialog = createDialog<{}>()(
  React.memo(({ t }) => t("アカウントの削除")),
  React.memo(({}) => {
    const currentUser = useCurrentUser();

    const [userName, setUserName] = useState("");
    const [isFailed, setStatus] = useState(false);

    const onDelete = useCallback(async () => {
      try {
        await deleteCurrentUser();

        location.reload();
      } catch (e) {
        setStatus(true);
      }
    }, []);

    return !isFailed ? (
      <>
        <Card>
          <Typography>すべての情報がサーバーから削除されます。</Typography>
        </Card>
        <Card>
          <TextField label="あなたのユーザー名" defaultValue={userName} onChange={setUserName} />
        </Card>
        <Button
          disabled={userName !== currentUser.name}
          icon={<Delete color="error" />}
          label="アカウントを削除する"
          labelColor="error"
          onClick={onDelete}
        />
      </>
    ) : (
      <>
        <Card>
          <Typography>アカウントの削除に失敗しました。</Typography>
        </Card>
        <Button icon={<Delete color="error" />} label="アカウントを削除する" labelColor="error" onClick={onDelete} />
      </>
    );
  })
);
