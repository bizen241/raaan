import { CircularProgress, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { EntityId, EntityType, EntityTypeToEntity } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { stringifyParams } from "../../api/request/search";
import { actions, useSelector } from "../../reducers";
import { Column } from "../ui";

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

export class BufferError<T extends EntityType> extends Error {
  constructor(public entityType: T, public entityId: EntityId<T>) {
    super();
  }
}

interface FetchErrorBoundaryState {
  error: Error | undefined;
}

export class FetchErrorBoundary extends React.Component<{}, FetchErrorBoundaryState> {
  static getDerivedStateFromError(error: Error): FetchErrorBoundaryState {
    return {
      error,
    };
  }

  constructor(props: React.Props<{}>) {
    super(props);

    this.state = { error: undefined };
  }

  onCancel = () => {
    this.setState({ error: undefined });
  };

  render() {
    const { error } = this.state;
    if (error === undefined) {
      return this.props.children;
    } else if (error instanceof EntityError) {
      return <EntityErrorHandler error={error} onFetched={this.onCancel} />;
    } else if (error instanceof SearchError) {
      return <SearchErrorHandler error={error} onFetched={this.onCancel} />;
    } else if (error instanceof BufferError) {
      return <BufferErrorHandler error={error} />;
    }

    throw error;
  }
}

interface EntityErrorHandlerProps<T extends EntityType> {
  error: EntityError<T>;
  onFetched: () => void;
}

const EntityErrorHandler = <T extends EntityType>({ error, onFetched }: EntityErrorHandlerProps<T>) => {
  const { entityType, entityId } = error;

  const dispatch = useDispatch();

  const entity = useSelector((state) => state.cache.get[entityType][entityId]);
  const status = useSelector((state) => state.api.get[entityType][entityId]);

  useEffect(() => {
    if (entity !== undefined) {
      setTimeout(onFetched, 5000);

      return;
    }

    dispatch(actions.api.get(entityType, entityId));
  }, [entity]);

  return <StatusRenderer status={status} />;
};

interface SearchErrorHandlerProps<T extends EntityType> {
  error: SearchError<T>;
  onFetched: () => void;
}

const SearchErrorHandler = <T extends EntityType>({ error, onFetched }: SearchErrorHandlerProps<T>) => {
  const { entityType, params } = error;

  const dispatch = useDispatch();

  const result = useSelector((state) => state.cache.search[entityType][stringifyParams(params, true)]);
  const status = useSelector((state) => state.api.search[entityType][stringifyParams(params)]);

  useEffect(() => {
    dispatch(actions.api.search(entityType, params, onFetched));
  }, [result]);

  return <StatusRenderer status={status} />;
};

interface BufferErrorHandlerProps<T extends EntityType> {
  error: BufferError<T>;
}

const BufferErrorHandler = <T extends EntityType>({ error }: BufferErrorHandlerProps<T>) => {
  const { entityType, entityId } = error;

  const dispatch = useDispatch();

  const buffer = useSelector((state) => state.buffers[entityType][entityId]);

  useEffect(() => {
    if (buffer !== undefined) {
      dispatch(actions.buffers.delete(entityType, entityId));
    }
  }, []);

  return <StatusRenderer status={404} />;
};

interface StatusRendererProps {
  status: number | undefined;
}

const StatusRenderer = ({ status }: StatusRendererProps) => {
  if (status === 403) {
    return (
      <Column justifyContent="center" flex={1}>
        <Typography>権限がありません。</Typography>
      </Column>
    );
  }
  if (status === 404) {
    return (
      <Column justifyContent="center" flex={1}>
        <Typography>見つかりませんでした。</Typography>
      </Column>
    );
  }

  return (
    <Column justifyContent="center" alignItems="center" flex={1}>
      <CircularProgress />
    </Column>
  );
};
