import { MenuItem } from "@blueprintjs/core";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Content } from "../../../../shared/api/entities";
import { connector } from "../../../reducers";
import { apiActions } from "../../../reducers/api";
import { buffersActions } from "../../../reducers/buffers";
import { List, PopMenu, Row } from "../../ui";

export const ContentList = connector(
  state => ({
    searchResult: state.cache.search.Content[""],
    contentCache: state.cache.get.Content
  }),
  () => ({
    deleteBuffer: buffersActions.delete,
    search: apiActions.search
  }),
  ({ searchResult, contentCache, deleteBuffer, search }) => {
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);

    const onDelete = useCallback((id: string) => deleteBuffer("ContentRevision", id), []);

    useEffect(() => {
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
    }, [limit, offset]);

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
        count={searchResult.count}
        onChangeLimit={setLimit}
        onChangeOffset={setOffset}
        focusKey="s"
      >
        {contents.map(
          content =>
            content && <ContentListItem key={content.id} contentId={content.id} content={content} onDelete={onDelete} />
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
  return (
    <Row center="cross">
      <Row flex={1}>
        <Link style={{ flex: 1 }} to={`/content-revisions/${contentId}/edit`}>
          {content.title || "無題"}
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
