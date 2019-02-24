import { Divider, MenuItem } from "@blueprintjs/core";
import * as React from "react";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import { connector } from "../../../reducers";
import { editorActions, EditorBuffer } from "../../../reducers/editor";
import { Column, List, PopMenu, Row } from "../../ui";

export const EditorBufferList = connector(
  state => ({
    buffers: state.editor.buffers
  }),
  () => ({
    deleteBuffer: editorActions.deleteBuffer
  }),
  ({ buffers, deleteBuffer }) => {
    return (
      <List
        title="編集中 (e)"
        currentPageNumber={1}
        totalItemCount={Object.keys(buffers).length}
        itemCountPerPage={10}
        focusKey="e"
        isOpen={true}
      >
        <Column padding="small">
          {Object.entries(buffers).map(
            ([contentId, buffer]) =>
              buffer && (
                <Column padding="small" key={contentId}>
                  <EditorBufferListItem contentId={contentId} buffer={buffer} onDelete={deleteBuffer} />
                  <Divider />
                </Column>
              )
          )}
        </Column>
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
          <MenuItem text="プレビュー (p)" />,
          <MenuItem text="削除 (d)" onClick={deleteBuffer} intent="danger" />
        ]}
        hotKeys={{}}
      />
    </Row>
  );
};
