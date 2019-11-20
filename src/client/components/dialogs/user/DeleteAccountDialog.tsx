import { Typography } from "@material-ui/core";
import { Delete, Warning } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useContext, useState } from "react";
import { deleteCurrentUser } from "../../../api/client";
import { createDialog } from "../../../enhancers/createDialog";
import { UserContext } from "../../project/Context";
import { Button, Card, DialogContent, TextField } from "../../ui";

export const DeleteAccountDialog = createDialog(
  React.memo(({ onClose }) => {
    const currentUser = useContext(UserContext);

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

    return (
      <DialogContent title="アカウントの削除" onClose={onClose}>
        {!isFailed ? (
          <>
            <Card icon={<Warning />} title="アカウントの削除">
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
            <Card icon={<Warning />} title="アカウントの削除の失敗">
              <Typography>アカウントの削除に失敗しました。</Typography>
            </Card>
            <Button
              icon={<Delete color="error" />}
              label="アカウントを削除する"
              labelColor="error"
              onClick={onDelete}
            />
          </>
        )}
      </DialogContent>
    );
  })
);
