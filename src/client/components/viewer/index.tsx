import { Avatar, Card, CardHeader, CircularProgress } from "@material-ui/core";
import { Done, Error } from "@material-ui/icons";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EntityObject, EntityType } from "../../../shared/api/entities";
import { RootState } from "../../reducers";
import { apiActions } from "../../reducers/api";
import { useStyles } from "../ui/styles";

interface EntityViewerContainerProps {
  entityId: string;
}

interface EntityViewerRendererProps<E extends EntityObject> {
  entityId: string;
  entity: E;
}

export const createEntityViewer = <E extends EntityObject>(
  entityType: EntityType,
  Renderer: React.ComponentType<EntityViewerRendererProps<E>>
) =>
  React.memo<EntityViewerContainerProps>(({ entityId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { entity, getStatus, deleteStatus } = useSelector((state: RootState) => ({
      entity: state.cache.get[entityType][entityId],
      getStatus: state.api.get[entityType][entityId],
      deleteStatus: state.api.delete[entityType][entityId]
    }));

    useEffect(() => {
      if (entity === undefined) {
        dispatch(apiActions.get(entityType, entityId));
      }
    }, []);

    if (getStatus === 404) {
      return (
        <Card>
          <CardHeader
            avatar={
              <Avatar className={classes.cardAvatar}>
                <Error />
              </Avatar>
            }
            title="見つかりませんでした"
            titleTypographyProps={{ variant: "h6" }}
          />
        </Card>
      );
    }
    if (deleteStatus === 102) {
      return (
        <Card>
          <CardHeader
            avatar={
              <Avatar className={classes.cardAvatar}>
                <CircularProgress />
              </Avatar>
            }
            title="削除中です"
            titleTypographyProps={{ variant: "h6" }}
          />
        </Card>
      );
    }
    if (deleteStatus === 200) {
      return (
        <Card>
          <CardHeader
            avatar={
              <Avatar className={classes.cardAvatar}>
                <Done />
              </Avatar>
            }
            title="削除が完了しました"
            titleTypographyProps={{ variant: "h6" }}
          />
        </Card>
      );
    }
    if (entity === undefined) {
      return (
        <Card>
          <CardHeader
            avatar={
              <Avatar className={classes.cardAvatar}>
                <CircularProgress />
              </Avatar>
            }
            title="ロード中です"
            titleTypographyProps={{ variant: "h6" }}
          />
        </Card>
      );
    }

    return <Renderer entityId={entityId} entity={entity as E} />;
  });
