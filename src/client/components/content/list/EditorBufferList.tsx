import { Divider, MenuItem } from "@blueprintjs/core";
import * as React from "react";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { connector } from "../../../reducers";
import { editorActions, EditorBuffer } from "../../../reducers/editor";
import { Column, List, PopMenu, Row } from "../../ui";

export const EditorBufferList = connector(
  state => ({
    bufferMap: state.editor.buffers
  }),
  () => ({
    deleteBuffer: editorActions.deleteBuffer
  }),
  ({ bufferMap, deleteBuffer }) => {
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);

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
        {bufferEntries.slice(offset, offset + limit).map(
          ([contentId, buffer]) =>
            buffer && (
              <Column padding key={contentId}>
                <EditorBufferListItem contentId={contentId} buffer={buffer} onDelete={deleteBuffer} />
                <Divider />
              </Column>
            )
        )}
      </List>
    );
  }
);

const EditorBufferListItem: React.FunctionComponent<{
  contentId: string;
  buffer: EditorBuffer;
  onDelete: (id: string) => void;
}> = ({ contentId, buffer, onDelete }) => {
  const deleteBuffer = useCallback(() => onDelete(contentId), []);

  return (
    <Row center="cross">
      <Row flex={1}>
        <Link style={{ flex: 1 }} to={`/contents/${contentId}/edit`}>
          {buffer.editedRevision.title || "無題"}
        </Link>
      </Row>
      <PopMenu
        items={[
          <MenuItem key="p" text="プレビュー (p)" />,
          <MenuItem key="d" text="削除 (d)" onClick={deleteBuffer} intent="danger" />
        ]}
        hotKeys={{}}
      />
    </Row>
  );
};
