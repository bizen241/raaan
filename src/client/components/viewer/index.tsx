import { Avatar, Card, CardHeader, CircularProgress } from "@material-ui/core";
import { Done, Error } from "@material-ui/icons";
import * as React from "react";
import { EntityObject, EntityType } from "../../../shared/api/entities";
import { useEntity } from "../../hooks/entity";
import { useStyles } from "../ui/styles";

interface EntityViewerContainerProps {
  entityId: string;
}

interface EntityViewerRendererProps<E extends EntityObject> {
  entityId: string;
  entity: E;
}

export const createEntityViewer = <E extends EntityObject, P extends {} = {}>(
  {
    entityType
  }: {
    entityType: EntityType;
  },
  Renderer: React.ComponentType<EntityViewerRendererProps<E> & P>
) =>
  React.memo<EntityViewerContainerProps & P>(({ entityId, ...props }) => {
    const classes = useStyles();

    const { entity, getStatus, deleteStatus } = useEntity(entityType, entityId);

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

    return <Renderer entityId={entityId} entity={entity as E} {...props as P} />;
  });
