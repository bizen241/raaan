import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { ContestViewer } from "../../viewers/ContestViewer";

export const ContestPage = createPage<"Contest">()(
  React.memo(({ t }) => t("セッションの詳細")),
  React.memo(({ entityId: contestId }) => {
    return <ContestViewer contestId={contestId} />;
  })
);
