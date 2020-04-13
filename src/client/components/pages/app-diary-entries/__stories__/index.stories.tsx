import React from "react";
import { decorator } from "../../../__stories__/helpers/decorator";
import { PageStory } from "../../__stories__/helpers/PageStory";

export default {
  title: "components/pages/app-diary-entries",
  decorators: [decorator],
};

export const AppDiary = () => {
  return <PageStory path="/app/diary" />;
};
