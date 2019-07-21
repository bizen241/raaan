import { Box, Button, Card, CardHeader, CircularProgress, Divider } from "@material-ui/core";
import { CloudUpload, Done, Error } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EntityObject, EntityType } from "../../../shared/api/entities";
import { actions, RootState } from "../../reducers";
import { isLocalOnly } from "../../reducers/api";
import { Buffer } from "../../reducers/buffers";
import { UserContext } from "../project/Context";
import { useStyles } from "../ui/styles";

export interface EntityEditorContainerProps {
  bufferId: string;
}

export interface EntityEditorRendererProps<E extends EntityObject> {
  bufferId: string;
  buffer: Buffer<E>;
}

export const EntityEditor = React.memo<{
  entityType: EntityType;
  bufferId: string;
  rendererComponent: React.ComponentType<EntityEditorRendererProps<any>>;
}>(({ entityType, bufferId, rendererComponent: Renderer }) => {
  const currentUser = useContext(UserContext);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { buffer, uploadStatus } = useSelector((state: RootState) => ({
    buffer: state.buffers[entityType][bufferId],
    uploadStatus: state.api.upload[entityType][bufferId]
  }));

  useEffect(() => {
    if (buffer === undefined && !isLocalOnly(bufferId)) {
      dispatch(actions.buffers.load(entityType, bufferId));
    }
  }, []);

  const onUpload = useCallback(() => dispatch(actions.api.upload(entityType, bufferId)), []);

  if (uploadStatus === 102) {
    return (
      <Card>
        <CardHeader avatar={<CircularProgress />} title="アップロード中です" />
      </Card>
    );
  }
  if (uploadStatus === 200) {
    return (
      <Card>
        <CardHeader avatar={<Done />} title="アップロードが完了しました" />
      </Card>
    );
  }

  if (buffer === undefined) {
    if (isLocalOnly(bufferId)) {
      return (
        <Card>
          <CardHeader avatar={<Error />} title="バッファが見つかりませんでした" />
        </Card>
      );
    } else {
      return (
        <Card>
          <CardHeader avatar={<CircularProgress />} title="ロード中です" />
        </Card>
      );
    }
  }

  const isGuest = currentUser.permission === "Guest";

  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" flexDirection="column" pb={1}>
        <Button className={classes.largeButton} variant="contained" size="large" disabled={isGuest} onClick={onUpload}>
          <CloudUpload className={classes.leftIcon} />
          アップロード
        </Button>
      </Box>
      <Box display="flex" flexDirection="column" pb={1}>
        <Divider variant="middle" />
      </Box>
      <Renderer bufferId={bufferId} buffer={buffer} />
    </Box>
  );
});
