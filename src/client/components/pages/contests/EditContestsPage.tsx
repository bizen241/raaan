import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { ContestBufferList } from "../../lists/contests/ContestBufferList";

export const EditContestsPage = createPage()(
  React.memo(({ t }) => t("未保存のセッション")),
  React.memo(() => {
    return <ContestBufferList />;
  })
);
