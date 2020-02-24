import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { ContestEditor } from "../../editors/ContestEditor";

export const EditContestPage = createPage<"Contest">()(
  React.memo(({ t }) => t("セッションを編集中")),
  React.memo(({ entityId: contestId }) => {
    return <ContestEditor bufferId={contestId} />;
  })
);
