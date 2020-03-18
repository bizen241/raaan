import React from "react";
import { MemoryRouter } from "react-router";
import { Router } from "../../../project/Router";

export const PageStory: React.FunctionComponent<{
  path: string;
}> = ({ path }) => {
  return (
    <MemoryRouter initialEntries={[path]}>
      <Router />
    </MemoryRouter>
  );
};
