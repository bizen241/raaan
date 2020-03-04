import { CircularProgress } from "@material-ui/core";
import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { Column } from "../../ui";

export const LoadingPage = createPage()(
  React.memo(({ t }) => t("読み込み中")),
  React.memo(() => {
    return (
      <Column justifyContent="center" alignItems="center" flex={1}>
        <CircularProgress />
      </Column>
    );
  })
);
