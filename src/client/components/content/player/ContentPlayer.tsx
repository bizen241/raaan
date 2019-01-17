import * as React from "react";
import { useEffect } from "react";
import { ContentData } from "../../../../shared/content";
import { connector } from "../../../reducers";
import { playerActions } from "../../../reducers/player";
import { Chars, Column } from "../../ui";
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
        <Column>
          {attempt.results.map((result, index) => (
            <Column key={index}>
              <Chars>{(result.typeCount / result.time) * 1000}</Chars>
              <pre>{JSON.stringify(result.typoMap, undefined, "  ")}</pre>
            </Column>
          ))}
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
