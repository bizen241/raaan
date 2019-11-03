import * as React from "react";
import { SynonymList } from "../../list/synonyms/SynonymList";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui/Page";

export const TagSynonymsPage = React.memo<PageProps>(props => {
  const tagName = props.match.params.name;

  return (
    <Page title="タグの別名">
      <SynonymList
        initialParams={{
          name: tagName
        }}
      />
    </Page>
  );
});
