import * as React from "react";
import { Tag } from "../../../../shared/api/entities";
import { useSearch } from "../../../hooks/useSearch";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui";
import { TagViewer } from "../../viewer/TagViewer";

export const TagPage = React.memo<PageProps>(props => {
  const tagName = props.match.params.name;

  const { entities: tags } = useSearch<Tag>("Tag", {
    name: tagName
  });
  const tag = tags[0];

  return <Page title="タグの詳細">{tag !== undefined && <TagViewer entityId={tag.id} />}</Page>;
});
