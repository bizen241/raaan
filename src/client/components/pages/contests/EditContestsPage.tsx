import React from "react";
import { ContestBufferList } from "../../lists/contests/ContestBufferList";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";

export const EditContestsPage = React.memo<PageProps>(() => {
  return (
    <Page title="未保存のセッション">
      <ContestBufferList />
    </Page>
  );
});
