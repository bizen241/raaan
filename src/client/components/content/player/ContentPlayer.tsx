import * as React from "react";
import { useEffect } from "react";
import { ContentRevision } from "../../../../shared/api/entities";
import { SaveParams } from "../../../../shared/api/request/save";
import { connector } from "../../../reducers";
import { playerActions } from "../../../reducers/player";
import { Column } from "../../ui";
import { AttemptResultRenderer } from "./AttemptResultRenderer";
import { ContentItemPlayer } from "./ContentItemPlayer";

export const ContentPlayer = connector(
  (state, ownProps: { content: SaveParams<ContentRevision> }) => ({
    content: ownProps.content,
    attempt: state.player
  }),
  () => ({
    ...playerActions
  }),
  ({ content, attempt, load, next }) => {
    useEffect(() => {
      load(content);
    }, []);

    if (attempt.content !== content) {
      return <div>Loading...</div>;
    }

    const { items = [] } = attempt.content;

    if (items.length === 0) {
      return <div>Empty</div>;
    }
    if (attempt.isFinished) {
      return (
        <Column flex={1} center="both">
          <AttemptResultRenderer attempt={attempt} />
        </Column>
      );
    }

    const currentItemIndex = attempt.plan[attempt.cursor];
    const currentItem = items[currentItemIndex];
    const currentCompiledItem = attempt.compiled[currentItemIndex];

    return (
      <Column padding flex={1}>
        <ContentItemPlayer key={attempt.cursor} item={currentItem} compiledItem={currentCompiledItem} onFinish={next} />
      </Column>
    );
  }
);
