import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { ObjectionBufferList } from "../../lists/objections/ObjectionBufferList";

export const EditObjectionsPage = createPage()(
  React.memo(({ t }) => t("未保存の抗議")),
  React.memo(() => {
    return <ObjectionBufferList />;
  })
);
