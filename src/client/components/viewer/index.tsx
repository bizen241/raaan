import { Card, CardHeader, CircularProgress } from "@material-ui/core";
import * as React from "react";
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
  const { entity } = useSelector((state: RootState) => ({
    entity: state.cache.get[entityType][entityId]
  }));

  React.useEffect(() => {
    if (entity === undefined) {
      dispatch(apiActions.get(entityType, entityId));
    }
  }, []);

  if (entity === undefined) {
    return (
      <Card>
        <CardHeader avatar={<CircularProgress />} title="ロード中です" />
      </Card>
    );
  }

  return <Renderer entityId={entityId} entity={entity} />;
});
