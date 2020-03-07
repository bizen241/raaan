import { CircularProgress, Typography } from "@material-ui/core";
import { Warning } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { EntityId, EntityType, EntityTypeToEntity } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { stringifyParams } from "../../api/request/search";
import { actions, useSelector } from "../../reducers";
import { Card, Column } from "../ui";

export class EntityError<T extends EntityType> extends Error {
  constructor(public entityType: T, public entityId: EntityId<T>) {
    super();
  }
}

export class SearchError<T extends EntityType> extends Error {
  constructor(public entityType: T, public params: Params<EntityTypeToEntity[T]>) {
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
      } else if (error instanceof SearchError) {
        return <Hoge entityType={error.entityType} params={error.params} onFetched={this.onCancel} />;
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

const Hoge = <T extends EntityType>({
  entityType,
  params,
  onFetched
}: {
  entityType: T;
  params: Params<EntityTypeToEntity[T]>;
  onFetched: () => void;
}) => {
  const dispatch = useDispatch();

  const result = useSelector(state => state.cache.search[entityType][stringifyParams(params, true)]);
  const status = useSelector(state => state.api.search[entityType][stringifyParams(params)]);

  useEffect(() => {
    if (result !== undefined) {
      setTimeout(onFetched, 5000);

      return;
    }

    dispatch(actions.api.search(entityType, params));
  }, [result]);

  if (status === 403) {
    return (
      <Card icon={<Warning />} title="404 Not Found">
        <Typography>権限がありません。</Typography>
      </Card>
    );
  }

  return (
    <Column justifyContent="center" alignItems="center" flex={1}>
      <CircularProgress />
    </Column>
  );
};
