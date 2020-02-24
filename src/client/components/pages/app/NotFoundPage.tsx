import { Card, CardHeader } from "@material-ui/core";
import { Error } from "@material-ui/icons";
import React from "react";
import { createPage } from "../../../enhancers/createPage";

export const NotFoundPage = createPage()(
  React.memo(({ t }) => t("404")),
  React.memo(() => {
    return (
      <Card>
        <CardHeader avatar={<Error />} title="ページが見つかりませんでした" />
      </Card>
    );
  })
);
