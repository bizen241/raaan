import { Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { EntityId } from "../../../../shared/api/entities";
import { createDialog, dialogTimeout } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card } from "../../ui";

export const DeletePlaylistBookmarkDialog = createDialog<{
  playlistBookmarkId: EntityId<"PlaylistBookmark">;
}>()(
  React.memo(({ t }) => t("ブックマークの削除")),
  React.memo(({ playlistBookmarkId, onClose }) => {
    const dispatch = useDispatch();

    const onDelete = () => {
      dispatch(actions.api.delete("PlaylistBookmark", playlistBookmarkId, dialogTimeout, onClose));
    };

    return (
      <>
        <Card>
          <Typography>ブックマークがサーバーから削除されます。</Typography>
        </Card>
        <Button icon={<Delete color="error" />} label="ブックマークを削除" labelColor="error" onClick={onDelete} />
      </>
    );
  })
);
