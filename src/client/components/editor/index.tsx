import { Box, Button, Card, CardHeader, CircularProgress, Divider } from "@material-ui/core";
import { CloudUpload, Done, Error } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EntityObject, EntityType } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";
import { useEntity } from "../../hooks/entity";
import { actions, RootState } from "../../reducers";
import { isLocalOnly } from "../../reducers/api";
import { UserContext } from "../project/Context";
import { useStyles } from "../ui/styles";

interface EntityEditorProps {
  bufferId: string;
}

interface EntityEditorRendererProps<E extends EntityObject> {
  bufferId: string;
  buffer: SaveParams<E>;
  source: Partial<E> | undefined;
  onChange: (params: SaveParams<E>) => void;
}

export const createEntityEditor = <E extends EntityObject>(
  entityType: EntityType,
  RendererComponent: React.ComponentType<EntityEditorRendererProps<E>>
) =>
  React.memo<EntityEditorProps>(({ bufferId }) => {
    const currentUser = useContext(UserContext);
    const classes = useStyles();
    const dispatch = useDispatch();

    const { entity, uploadStatus } = useEntity<E>(entityType, bufferId);
    const buffer = useSelector((state: RootState) => state.buffers[entityType][bufferId] as SaveParams<E> | undefined);

    useEffect(() => {
      if (buffer === undefined && entity !== undefined && !isLocalOnly(bufferId)) {
        dispatch(actions.buffers.add(entityType, bufferId));
      }
    }, []);

    const onChange = useCallback(
      (params: SaveParams<E>) => dispatch(actions.buffers.update(entityType, bufferId, params)),
      []
    );
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
          <Button
            className={classes.largeButton}
            variant="contained"
            size="large"
            disabled={isGuest}
            onClick={onUpload}
          >
            <CloudUpload className={classes.leftIcon} />
            アップロード
          </Button>
        </Box>
        <Box display="flex" flexDirection="column" pb={1}>
          <Divider variant="middle" />
        </Box>
        <RendererComponent bufferId={bufferId} buffer={buffer} source={entity} onChange={onChange} />
      </Box>
    );
  });
