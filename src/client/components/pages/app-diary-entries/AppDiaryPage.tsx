import React from "react";
import { AppDiaryGraph } from "../../graphs/AppDiaryGraph";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";

export const AppDiaryPage = React.memo<PageProps>(() => {
  return (
    <Page title="アプリの記録">
      <AppDiaryGraph />
    </Page>
  );
});
