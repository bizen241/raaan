import React from "react";
import { createDiaryGraph } from "../../enhancers/createDiaryGraph";
import { Property } from "../ui";

export const TagDiaryGraph = createDiaryGraph("TagDiaryEntry")(({ diaryEntry }) => {
  return (
    <>
      <Property label="タイプ数">{(diaryEntry && diaryEntry.typedCount) || 0}</Property>
      <Property label="提出回数">{(diaryEntry && diaryEntry.submittedCount) || 0}</Property>
    </>
  );
});
