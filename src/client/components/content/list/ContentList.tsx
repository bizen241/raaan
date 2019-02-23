import { ButtonGroup, Classes, Collapse, Divider, Menu, MenuItem, Popover } from "@blueprintjs/core";
import * as React from "react";
import { useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Content } from "../../../../shared/api/entities";
import { entityActions } from "../../../actions/entity";
import { connector } from "../../../reducers";
import { editorActions } from "../../../reducers/editor";
import { Column, Row } from "../../ui";
import { manageHotKey } from "../../utils/hotKey";

export const ContentList = connector(
  state => ({
    buffers: state.editor.buffers,
    searchResult: state.cache.search.Content[""],
    contentCache: state.cache.get.Content
  }),
  () => ({
    deleteBuffer: editorActions.deleteBuffer,
    search: entityActions.search
  }),
  ({ searchResult, contentCache, deleteBuffer, search }) => {
    const ref = useRef<HTMLButtonElement>(null);

    useEffect(() => {
      if (searchResult === undefined) {
        search<Content>("Content", {
          page: 0
        });
      }
    }, []);

    useEffect(
      manageHotKey({
        s: () => ref.current && ref.current.focus()
      }),
      []
    );

    if (searchResult === undefined) {
      return <div>Loading...</div>;
    }

    const contentIds = searchResult.pages[0] || [];
    const contents = contentIds.map(contentId => contentCache[contentId]);

    return (
      <Column className={`${Classes.TREE} ${Classes.ELEVATION_0}`}>
        <Row>
          <ButtonGroup fill minimal>
            <button className={`${Classes.BUTTON} ${Classes.FILL} ${Classes.ALIGN_LEFT}`} ref={ref}>
              <span className={`${Classes.ICON_STANDARD} bp3-icon-chevron-down`} />
              <span className={Classes.BUTTON_TEXT}>保存済み (s)</span>
            </button>
          </ButtonGroup>
        </Row>
        <Collapse isOpen>
          <Column padding="small">
            {contents.map(
              content =>
                content && (
                  <Column padding="small" key={content.id}>
                    <ContentListItem contentId={content.id} content={content} onDelete={deleteBuffer} />
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

const ContentListItem: React.FunctionComponent<{
  contentId: string;
  content: Content;
  onDelete: (id: string) => void;
}> = ({ contentId, content, onDelete }) => {
  const deleteBuffer = useCallback(() => onDelete(contentId), []);

  return (
    <Row center="cross">
      <Row flex={1}>
        <Link style={{ flex: 1 }} to={`/contents/${contentId}/edit`}>
          {content.title || "無題"}
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
