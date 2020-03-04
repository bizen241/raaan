import { CircularProgress, Typography } from "@material-ui/core";
import { Warning } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { EntityId, EntityType } from "../../../shared/api/entities";
import { actions, useSelector } from "../../reducers";
import { Card, Column } from "../ui";

export class EntityError<T extends EntityType> extends Error {
  constructor(public entityType: T, public entityId: EntityId<T>) {
    super();
  }
}

interface PageErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class PageErrorBoundary extends React.Component<{}, PageErrorBoundaryState> {
  static getDerivedStateFromError(e: Error): PageErrorBoundaryState {
    return {
      hasError: true,
      error: e
    };
  }

  constructor(props: React.Props<{}>) {
    super(props);

    this.state = { hasError: false };
  }

  onCancel = () => {
    this.setState({ hasError: false });
  };

  render() {
    const { hasError, error = new Error() } = this.state;
    if (hasError) {
      if (error instanceof EntityError) {
        return <EntityLoader entityType={error.entityType} entityId={error.entityId} onFetched={this.onCancel} />;
      } else {
        throw error;
      }
    }

    return this.props.children;
  }
}

const EntityLoader = <T extends EntityType>({
  entityType,
  entityId,
  onFetched
}: {
  entityType: T;
  entityId: EntityId<T>;
  onFetched: () => void;
}) => {
  const dispatch = useDispatch();

  const entity = useSelector(state => state.cache.get[entityType][entityId]);
  const status = useSelector(state => state.api.get[entityType][entityId]);

  useEffect(() => {
    if (entity !== undefined) {
      setTimeout(onFetched, 5000);

      return;
    }

    dispatch(actions.api.get(entityType, entityId));
  }, [entity]);

  if (status === 404) {
    return (
      <Card icon={<Warning />} title="404 Not Found">
        <Typography>見つかりませんでした。</Typography>
      </Card>
    );
  }

  return (
    <Column justifyContent="center" alignItems="center" flex={1}>
      <CircularProgress />
    </Column>
  );
};
