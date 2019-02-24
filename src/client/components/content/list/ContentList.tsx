import { Divider, MenuItem } from "@blueprintjs/core";
import * as React from "react";
import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { Content } from "../../../../shared/api/entities";
import { entityActions } from "../../../actions/entity";
import { connector } from "../../../reducers";
import { editorActions } from "../../../reducers/editor";
import { Column, List, PopMenu, Row } from "../../ui";

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
    useEffect(() => {
      if (searchResult === undefined) {
        search<Content>("Content", {
          page: 0
        });
      }
    }, []);

    if (searchResult === undefined) {
      return <div>Loading...</div>;
    }

    const contentIds = searchResult.pages[0] || [];
    const contentCount = searchResult.count;
    const contents = contentIds.map(contentId => contentCache[contentId]);

    return (
      <List
        title="保存済み (s)"
        currentPageNumber={1}
        totalItemCount={contentCount}
        itemCountPerPage={10}
        focusKey="s"
        isOpen={true}
      >
        <Column padding="small">
          {contents.map(
            content =>
              content && (
                <Column key={content.id}>
                  <Column padding="small">
                    <ContentListItem contentId={content.id} content={content} onDelete={deleteBuffer} />
                  </Column>
                  <Divider />
                </Column>
              )
          )}
        </Column>
      </List>
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
