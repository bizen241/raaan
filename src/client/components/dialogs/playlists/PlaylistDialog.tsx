import { TextField, Typography } from "@material-ui/core";
import { Add, CloudUpload, PlaylistPlay } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { Playlist, PlaylistItem, PlaylistSummary } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { useSearch } from "../../../hooks/useSearch";
import { useToggleState } from "../../../hooks/useToggleState";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { ExerciseContext, PlaylistSummarySelectList } from "../../list/PlaylistSummarySelectList";
import { UserContext } from "../../project/Context";
import { Button, Card, Column, DialogContent } from "../../ui";

export const PlaylistDialog = createDialog<{
  exerciseId: string;
}>(
  React.memo(({ exerciseId, onClose }) => {
    const dispatch = useDispatch();
    const currentUser = useContext(UserContext);

    const [isEditoOpen, onToggleEditor] = useToggleState();
    const [title, setTitle] = useState();

    const { onReload: onReloadPlaylistSummaries } = useSearch<PlaylistSummary>("PlaylistSummary", {
      authorId: currentUser.id
    });
    const { onReload: onReloadPlaylistItems } = useSearch<PlaylistItem>("PlaylistItem", {
      authorId: currentUser.id,
      exerciseId
    });

    const onUpdateTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    }, []);
    const onUploadPlaylist = () => {
      const bufferId = generateBufferId();

      dispatch(
        actions.api.upload<Playlist>(
          "Playlist",
          bufferId,
          {
            title,
            exerciseId
          },
          () => {
            onReloadPlaylistSummaries();
            onReloadPlaylistItems();
            onClose();
          }
        )
      );
    };

    return (
      <DialogContent title="プレイリストに追加" onClose={onClose}>
        {!isEditoOpen ? (
          <>
            <Button icon={<Add />} label="新規作成" onClick={onToggleEditor} />
            <Column pb={1}>
              <ExerciseContext.Provider value={exerciseId}>
                <PlaylistSummarySelectList
                  title="プレイリスト一覧"
                  initialParams={{
                    authorId: currentUser.id
                  }}
                  onReload={onReloadPlaylistItems}
                />
              </ExerciseContext.Provider>
            </Column>
          </>
        ) : (
          <>
            <Card icon={<PlaylistPlay />} title="プレイリストを作る">
              <Column component="label">
                <Typography color="textSecondary">題名</Typography>
                <TextField variant="outlined" defaultValue={"新しいプレイリスト"} onChange={onUpdateTitle} />
              </Column>
            </Card>
            <Button icon={<CloudUpload />} label="プレイリストをアップロード" onClick={onUploadPlaylist} />
          </>
        )}
      </DialogContent>
    );
  })
);
