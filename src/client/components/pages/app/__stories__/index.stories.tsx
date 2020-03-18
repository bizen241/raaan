import React from "react";
import { decorator } from "../../../__stories__/helpers/decorator";
import { PageStory } from "../../__stories__/helpers/PageStory";

export default {
  title: "components/pages/app",
  decorators: [decorator]
};

export const App = () => {
  return <PageStory path="/app" />;
};

export const Cache = () => {
  return <PageStory path="/app/cache" />;
};

export const Dependencies = () => {
  return <PageStory path="/app/dependencies" />;
};

export const Home = () => {
  return <PageStory path="/" />;
};

export const Version = () => {
  return <PageStory path="/app/version" />;
};
