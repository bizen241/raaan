import React from "react";
import { createDiaryGraph } from "../../enhancers/createDiaryGraph";
import { Property } from "../ui";

export const UserDiaryGraph = createDiaryGraph("UserDiaryEntry")(({ diaryEntry }) => {
  return (
    <>
      <Property label="タイプ数">{(diaryEntry && diaryEntry.typeCount) || 0}</Property>
      <Property label="提出回数">{(diaryEntry && diaryEntry.submitCount) || 0}</Property>
    </>
  );
});
