import { Card, CardHeader, CircularProgress } from "@material-ui/core";
import { Done, Error } from "@material-ui/icons";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EntityObject, EntityType } from "../../../shared/api/entities";
import { RootState } from "../../reducers";
import { apiActions } from "../../reducers/api";

export interface EntityViewerContainerProps {
  entityId: string;
}

export interface EntityViewerRendererProps<E extends EntityObject> {
  entityId: string;
  entity: E;
}

export const EntityViewer = React.memo<{
  entityType: EntityType;
  entityId: string;
  renderer: React.ComponentType<EntityViewerRendererProps<any>>;
}>(({ entityType, entityId, renderer: Renderer }) => {
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
        <CardHeader avatar={<Error />} title="見つかりませんでした" />
      </Card>
    );
  }
  if (deleteStatus === 102) {
    return (
      <Card>
        <CardHeader avatar={<CircularProgress />} title="削除中です" />
      </Card>
    );
  }
  if (deleteStatus === 200) {
    return (
      <Card>
        <CardHeader avatar={<Done />} title="削除が完了しました" />
      </Card>
    );
  }
  if (entity === undefined) {
    return (
      <Card>
        <CardHeader avatar={<CircularProgress />} title="ロード中です" />
      </Card>
    );
  }

  return <Renderer entityId={entityId} entity={entity} />;
});
