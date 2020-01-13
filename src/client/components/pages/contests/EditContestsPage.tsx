import React from "react";
import { ContestBufferList } from "../../list/contests/ContestBufferList";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui/Page";

export const EditContestsPage = React.memo<PageProps>(() => {
  return (
    <Page title="未保存のセッション">
      <ContestBufferList />
    </Page>
  );
});
