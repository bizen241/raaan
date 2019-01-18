import * as React from "react";
import { useEffect } from "react";
import { ContentData } from "../../../../shared/content";
import { connector } from "../../../reducers";
import { playerActions } from "../../../reducers/player";
import { Column } from "../../ui";
import { AttemptResultRenderer } from "./AttemptResultRenderer";
import { ContentItemPlayer } from "./ContentItemPlayer";

export const ContentPlayer = connector(
  (state, ownProps: { data: ContentData }) => ({
    data: ownProps.data,
    attempt: state.player
  }),
  () => ({
    ...playerActions
  }),
  ({ data, attempt, load, next }) => {
    useEffect(() => {
      load(data);
    }, []);

    if (attempt.data !== data) {
      return <div>Loading...</div>;
    }
    if (attempt.data.items.length === 0) {
      return <div>Empty</div>;
    }
    if (attempt.isFinished) {
      return (
        <Column flex={1} center="both">
          <AttemptResultRenderer attempt={attempt} />;
        </Column>
      );
    }

    const currentItemIndex = attempt.plan[attempt.cursor];
    const currentItem = attempt.data.items[currentItemIndex];
    const currentCompiledItem = attempt.compiled[currentItemIndex];

    return (
      <Column padding="small" flex={1}>
        <ContentItemPlayer key={attempt.cursor} item={currentItem} compiledItem={currentCompiledItem} onFinish={next} />
      </Column>
    );
  }
);
