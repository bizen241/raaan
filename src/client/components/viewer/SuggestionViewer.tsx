import { WbIncandescent } from "@material-ui/icons";
import * as React from "react";
import { withEntity } from "../../enhancers/withEntity";
import { Card, Column, Property } from "../ui";

export const SuggestionViewer = withEntity("Suggestion")(
  React.memo(({ entity: suggestion }) => {
    return (
      <Column>
        <Card icon={<WbIncandescent />} title="提案">
          <Property label="状態">{suggestion.state}</Property>
        </Card>
      </Column>
    );
  })
);
