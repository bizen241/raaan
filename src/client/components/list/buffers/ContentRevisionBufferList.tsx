import { MenuItem } from "@blueprintjs/core";
import * as React from "react";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { ExerciseRevision } from "../../../../shared/api/entities";
import { connector } from "../../../reducers";
import { Buffer, buffersActions } from "../../../reducers/buffers";
import { PopMenu, Row } from "../../ui";
import { List } from "../List";

export const ExerciseRevisionBufferList = connector(
  state => ({
    bufferMap: state.buffers.ExerciseRevision
  }),
  () => ({
    deleteBuffer: buffersActions.delete
  }),
  ({ bufferMap, deleteBuffer }) => {
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);

    const onDelete = useCallback((id: string) => deleteBuffer("ExerciseRevision", id), []);

    const bufferEntries = Object.entries(bufferMap);

    return (
      <List
        title="編集中 (e)"
        limit={limit}
        offset={offset}
        count={bufferEntries.length}
        onChangeLimit={setLimit}
        onChangeOffset={setOffset}
        focusKey="e"
      >
        {bufferEntries
          .slice(offset, offset + limit)
          .map(
            ([contentId, buffer]) =>
              buffer && (
                <EditorBufferListItem key={contentId} contentId={contentId} buffer={buffer} onDelete={onDelete} />
              )
          )}
      </List>
    );
  }
);

const EditorBufferListItem: React.FunctionComponent<{
  contentId: string;
  buffer: Buffer<ExerciseRevision>;
  onDelete: (id: string) => void;
}> = ({ contentId, buffer, onDelete }) => {
  return (
    <Row center="cross">
      <Row flex={1}>
        <Link style={{ flex: 1 }} to={`/content-revisions/${contentId}/edit`}>
          {buffer.edited.title || "無題"}
        </Link>
      </Row>
      <PopMenu
        items={[
          <MenuItem key="p" text="プレビュー (p)" />,
          <MenuItem key="d" text="削除 (d)" onClick={useCallback(() => onDelete(contentId), [])} intent="danger" />
        ]}
        hotKeys={{}}
      />
    </Row>
  );
};