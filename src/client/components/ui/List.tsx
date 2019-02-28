import { ButtonGroup, Classes, Collapse, Divider } from "@blueprintjs/core";
import * as React from "react";
import { useCallback, useState } from "react";
import { Details } from "./Details";
import { Column } from "./Flex";
import { Summary } from "./Summary";

export const List: React.FunctionComponent<{
  title: string;
  limit: number;
  offset: number;
  count: number;
  onChangeLimit: (limit: number) => void;
  onChangeOffset: (offset: number) => void;
  focusKey: string;
}> = ({ title, limit, offset, count, onChangeOffset, focusKey, children }) => {
  const [isOpen, toggleList] = useState(true);

  const goPreviousPage = useCallback(() => onChangeOffset(offset - limit), [limit, offset]);
  const goNextPage = useCallback(() => onChangeOffset(offset + limit), [limit, offset]);

  const hasPreviousPage = offset !== 0;
  const hasNextPage = count > offset + limit;

  if (!Array.isArray(children)) {
    throw new Error();
  }

  const items = children.filter(child => child != null && child !== undefined);

  return (
    <Details>
      <Summary title={title} focusKey={focusKey} isOpen={isOpen} onClick={useCallback(() => toggleList(s => !s), [])} />
      <Collapse isOpen={isOpen}>
        {items.length > 0 ? (
          <Column padding>
            <Column>
              {items.map((child, index) => (
                <Column key={offset + index}>
                  <Column padding>{child}</Column>
                  <Divider />
                </Column>
              ))}
            </Column>
          </Column>
        ) : (
          <Column center="both" padding>
            アイテムがありません
          </Column>
        )}
        <Column padding>
          <ButtonGroup fill>
            <button
              onClick={hasPreviousPage ? goPreviousPage : undefined}
              className={`${Classes.BUTTON} ${hasPreviousPage ? "" : Classes.DISABLED} ${Classes.iconClass(
                "chevron-left"
              )}`}
            />
            <span className={`${Classes.BUTTON} ${Classes.FOCUS_DISABLED}`}>{(offset + limit) / limit}</span>
            <button
              onClick={hasNextPage ? goNextPage : undefined}
              className={`${Classes.BUTTON} ${hasNextPage ? "" : Classes.DISABLED} ${Classes.iconClass(
                "chevron-right"
              )}`}
            />
          </ButtonGroup>
        </Column>
      </Collapse>
    </Details>
  );
};
