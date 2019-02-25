import { Divider, MenuItem } from "@blueprintjs/core";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
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
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);

    useEffect(
      () => {
        if (
          searchResult === undefined ||
          searchResult.ids.length < offset + limit ||
          searchResult.ids.slice(offset, offset + limit).some(id => id === undefined)
        ) {
          search<Content>("Content", {
            limit,
            offset
          });
        }
      },
      [limit, offset]
    );

    if (searchResult === undefined) {
      return <div>Loading...</div>;
    }

    const contents = searchResult.ids
      .slice(offset, offset + limit)
      .map(contentId => contentId && contentCache[contentId]);

    return (
      <List
        title="保存済み (s)"
        limit={limit}
        offset={offset}
        onChangeLimit={setLimit}
        onChangeOffset={setOffset}
        hasNextPage={searchResult.count > offset + limit}
        focusKey="s"
      >
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
          <MenuItem key="p" text="プレビュー (p)" />,
          <MenuItem key="d" text="削除 (d)" onClick={deleteBuffer} intent="danger" />
        ]}
        hotKeys={{}}
      />
    </Row>
  );
};
