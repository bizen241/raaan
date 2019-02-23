import { ButtonGroup, Classes, Collapse, Divider, Menu, MenuItem, Popover } from "@blueprintjs/core";
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
    const ref = useRef<HTMLButtonElement>(null);

    useEffect(
      manageHotKey({
        e: () => ref.current && ref.current.focus()
      }),
      []
    );

    return (
      <Column className={`${Classes.TREE} ${Classes.ELEVATION_0}`}>
        <Row>
          <ButtonGroup fill minimal>
            <button className={`${Classes.BUTTON} ${Classes.FILL} ${Classes.ALIGN_LEFT}`} ref={ref}>
              <span className={`${Classes.ICON_STANDARD} bp3-icon-chevron-down`} />
              <span className={Classes.BUTTON_TEXT}>編集中 (e)</span>
            </button>
          </ButtonGroup>
        </Row>
        <Collapse isOpen>
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
        </Collapse>
      </Column>
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
      <Popover
        content={
          <Menu>
            <MenuItem text="プレビュー (p)" />
            <MenuItem text="削除 (d)" onClick={deleteBuffer} intent="danger" />
          </Menu>
        }
        position="bottom-right"
      >
        <button className={`${Classes.BUTTON} ${Classes.MINIMAL} ${Classes.iconClass("more")}`} />
      </Popover>
    </Row>
  );
};
