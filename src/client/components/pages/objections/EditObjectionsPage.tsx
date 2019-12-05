import * as React from "react";
import { ObjectionBufferList } from "../../list/objections/ObjectionBufferList";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui/Page";

export const EditObjectionsPage = React.memo<PageProps>(() => {
  return (
    <Page title="未保存の異議">
      <ObjectionBufferList />
    </Page>
  );
});
