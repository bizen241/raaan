import React from "react";
import { decorator } from "../../__stories__/decorator";
import { Button } from "../Button";

export default {
  component: Button,
  title: "Button",
  decorators: [decorator]
};

export const Default = () => <Button label="Button" />;
