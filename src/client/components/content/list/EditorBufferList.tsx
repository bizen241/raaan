import { Card, Classes, Divider, Menu, MenuItem, Popover } from "@blueprintjs/core";
import * as React from "react";
import { useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { connector } from "../../../reducers";
import { editorActions, EditorBuffer } from "../../../reducers/editor";
import { Column, Row } from "../../ui";
import { manageHotKey } from "../../utils/hotKey";

export const EditorBufferList = connector(
  state => ({
    buffers: state.editor.buffers
  }),
  () => ({
    deleteBuffer: editorActions.deleteBuffer
  }),
  ({ buffers, deleteBuffer }) => {
    const firstItemMenuRef = useRef<HTMLButtonElement>(null);

    useEffect(
      manageHotKey({
        e: () => firstItemMenuRef.current && firstItemMenuRef.current.focus()
      }),
      []
    );

    return (
      <Column>
        <Column padding="small">編集中 (e)</Column>
        <Card>
          <Column>
            {Object.entries(buffers).map(
              ([contentId, buffer], index) =>
                buffer && (
                  <Column key={contentId}>
                    <EditorBufferListItem
                      contentId={contentId}
                      buffer={buffer}
                      ref={index === 0 ? firstItemMenuRef : null}
                      onDelete={deleteBuffer}
                    />
                    <Divider />
                  </Column>
                )
            )}
          </Column>
        </Card>
      </Column>
    );
  }
);

const EditorBufferListItem: React.FunctionComponent<{
  contentId: string;
  buffer: EditorBuffer;
  ref: React.RefObject<HTMLButtonElement> | null;
  onDelete: (id: string) => void;
}> = ({ contentId, buffer, ref, onDelete }) => {
  const deleteBuffer = useCallback(() => onDelete(contentId), []);

  return (
    <Row center="cross">
      <Row flex={1}>
        <Link style={{ flex: 1 }} to={`/contents/${contentId}/edit`}>
          {buffer.editedRevision.title || "無題"}
        </Link>
      </Row>
      <Popover
        content={
          <Menu>
            <MenuItem text="プレビュー (p)" />
            <MenuItem text="削除 (d)" onClick={deleteBuffer} intent="danger" />
          </Menu>
        }
        position="bottom-right"
      >
        <button className={`${Classes.BUTTON} ${Classes.MINIMAL} ${Classes.iconClass("more")}`} ref={ref} />
      </Popover>
    </Row>
  );
};
