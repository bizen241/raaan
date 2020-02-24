import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { AppDiaryGraph } from "../../graphs/AppDiaryGraph";

export const AppDiaryPage = createPage()(
  React.memo(({ t }) => t("アプリの記録")),
  React.memo(() => {
    return <AppDiaryGraph />;
  })
);
