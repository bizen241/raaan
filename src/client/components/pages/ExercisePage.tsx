import * as React from "react";
import { connector } from "../../reducers";
import { PageProps } from "../project/Router";
import { Page } from "./Page";

export const ExercisePage = connector(
  (_, ownProps: PageProps) => ({
    id: ownProps.match.params.id
  }),
  () => ({}),
  ({ id }) => {
    return <Page>{id}</Page>;
  }
);
