import React from "react";
import * as UI from "..";
import { decorator } from "../../__stories__/helpers/decorator";

export default {
  title: "components/ui",
  decorators: [decorator],
};

export const Button = () => {
  return <UI.Button label="Button" />;
};

export const Card = () => {
  return (
    <UI.Card title="Card">
      <div />
    </UI.Card>
  );
};

export const DateTimeField = () => {
  return <UI.DateTimeField defaultValue={Date.now()} onChange={() => null} />;
};
