import React from "react";
import { MemoryRouter } from "react-router";
import { decorator } from "../../../__stories__/decorator";
import { HomePage } from "../HomePage";

export default {
  title: "pages/HomePage",
  decorators: [decorator]
};

export const Default = () => (
  <MemoryRouter>
    <HomePage />
  </MemoryRouter>
);
