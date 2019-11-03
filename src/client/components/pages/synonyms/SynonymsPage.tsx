import * as React from "react";
import { SynonymList } from "../../list/synonyms/SynonymList";
import { Page } from "../../ui";

export const SynonymsPage = React.memo(() => {
  return (
    <Page title="タグの別名を探す">
      <SynonymList initialParams={{}} />
    </Page>
  );
});
