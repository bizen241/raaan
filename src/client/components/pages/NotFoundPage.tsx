import { Card, CardHeader } from "@material-ui/core";
import { Error } from "@material-ui/icons";
import * as React from "react";
import { connector } from "../../reducers";
import { Page } from "./Page";

export const NotFoundPage = connector(
  () => ({}),
  () => ({}),
  ({}) => {
    return (
      <Page>
        <Card>
          <CardHeader avatar={<Error />} title="バッファが見つかりませんでした" />
        </Card>
      </Page>
    );
  }
);
