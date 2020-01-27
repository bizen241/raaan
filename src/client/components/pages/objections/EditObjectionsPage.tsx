import React from "react";
import { ObjectionBufferList } from "../../lists/objections/ObjectionBufferList";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";

export const EditObjectionsPage = React.memo<PageProps>(() => {
  return (
    <Page title="未保存の抗議">
      <ObjectionBufferList />
    </Page>
  );
});
