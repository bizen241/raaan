import * as React from "react";
import { ObjectionList } from "../../list/objections/ObjectionList";
import { Page } from "../../ui";

export const ObjectionsPage = React.memo(() => {
  return (
    <Page title="クイズの異議の一覧">
      <ObjectionList initialParams={{}} />
    </Page>
  );
});
