import { Card, CardHeader } from "@material-ui/core";
import { Error } from "@material-ui/icons";
import React from "react";
import { Page } from "../../project/Page";

export const NotFoundPage = React.memo(() => {
  return (
    <Page>
      <Card>
        <CardHeader avatar={<Error />} title="ページが見つかりませんでした" />
      </Card>
    </Page>
  );
});
