import { Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { EntityId } from "../../../../shared/api/entities";
import { createDialog, dialogTimeout } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card } from "../../ui";

export const DeletePlaylistDialog = createDialog<{
  playlistId: EntityId<"Playlist">;
}>()(
  React.memo(({ t }) => t("プレイリストの削除")),
  React.memo(({ playlistId, onClose }) => {
    const dispatch = useDispatch();

    const onDelete = () => {
      dispatch(actions.api.delete("Playlist", playlistId, dialogTimeout, onClose));
    };

    return (
      <>
        <Card>
          <Typography>プレイリストがサーバーから削除されます。</Typography>
        </Card>
        <Button icon={<Delete color="error" />} label="プレイリストを削除" labelColor="error" onClick={onDelete} />
      </>
    );
  })
);
