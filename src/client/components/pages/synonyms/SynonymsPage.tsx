import React from "react";
import { SynonymList } from "../../lists/synonyms/SynonymList";
import { Page } from "../../project/Page";

export const SynonymsPage = React.memo(() => {
  return (
    <Page title="タグの別名を探す">
      <SynonymList initialParams={{}} />
    </Page>
  );
});
