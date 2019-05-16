import { Button, Classes, Collapse, HTMLTable } from "@blueprintjs/core";
import * as React from "react";
import { useCallback, useState } from "react";
import { Column, Details, Row, Summary } from "../ui";

export const List = React.memo<{
  limit: number;
  offset: number;
  count: number;
  onChangeLimit: (limit: number) => void;
  onChangeOffset: (offset: number) => void;
  focusKey: string;
  children: React.ReactNode;
}>(({ limit, offset, count, onChangeLimit, onChangeOffset, children }) => {
  const [isSettingsOpen, toggleSettings] = useState(false);

  const goPreviousPage = useCallback(() => onChangeOffset(offset - limit), [limit, offset]);
  const goNextPage = useCallback(() => onChangeOffset(offset + limit), [limit, offset]);

  const hasPreviousPage = offset !== 0;
  const hasNextPage = count > offset + limit;

  if (!Array.isArray(children)) {
    throw new Error();
  }

  const items = children.filter(child => child != null && child !== undefined);
  const padding = offset !== 0 ? Array(limit - items.length).fill(items[0]) : [];

  const offsetOptions: React.ReactNode[] = [];
  const pageCount = Math.ceil(count / limit);
  for (let i = 0; i < pageCount; i++) {
    const pageOffset = i * limit;

    offsetOptions.push(
      <option key={i} value={pageOffset.toString()}>{`${pageOffset + 1}-${pageOffset + limit}`}</option>
    );
  }

  const paginationButtons = (
    <Row padding="vertical">
      <Row flex={1} style={{ paddingRight: "0.5rem" }}>
        <Button
          fill
          large
          text="前へ"
          icon="chevron-left"
          disabled={!hasPreviousPage}
          onClick={hasPreviousPage ? goPreviousPage : undefined}
        />
      </Row>
      <Row flex={1}>
        <Button
          fill
          large
          text="次へ"
          rightIcon="chevron-right"
          disabled={!hasNextPage}
          onClick={hasNextPage ? goNextPage : undefined}
        />
      </Row>
    </Row>
  );

  return (
    <Column>
      <Details>
        <Summary title="表示設定" isOpen={isSettingsOpen} onClick={useCallback(() => toggleSettings(s => !s), [])} />
        <Collapse isOpen={isSettingsOpen}>
          <Column padding="around">
            <Column>
              <label className={`${Classes.LABEL}`}>
                <Column>件数</Column>
                <Column className={`${Classes.SELECT} ${Classes.FILL} ${Classes.LARGE}`}>
                  <select
                    value={limit.toString()}
                    style={{ textAlign: "center" }}
                    onChange={useCallback(
                      (e: React.ChangeEvent<HTMLSelectElement>) => onChangeLimit(Number(e.target.value)),
                      []
                    )}
                  >
                    <option value={"10"}>10</option>
                    <option value={"20"}>20</option>
                    <option value={"50"}>50</option>
                  </select>
                </Column>
              </label>
            </Column>
            <Column>
              <label className={`${Classes.LABEL}`}>
                <Column>範囲</Column>
                <Column className={`${Classes.SELECT} ${Classes.FILL} ${Classes.LARGE}`}>
                  <select
                    value={offset.toString()}
                    style={{ textAlign: "center" }}
                    onChange={useCallback(
                      (e: React.ChangeEvent<HTMLSelectElement>) => onChangeOffset(Number(e.target.value)),
                      []
                    )}
                  >
                    {offsetOptions}
                  </select>
                </Column>
              </label>
            </Column>
          </Column>
        </Collapse>
      </Details>
      {paginationButtons}
      {items.length > 0 ? (
        <Column padding="vertical">
          <HTMLTable bordered style={{ width: "100%" }}>
            <tbody>
              {items.map((item, index) => (
                <tr key={offset + index}>
                  <td>{item}</td>
                </tr>
              ))}
              {padding.map((item, index) => (
                <tr key={index}>
                  <td style={{ visibility: "hidden" }}>{item}</td>
                </tr>
              ))}
            </tbody>
          </HTMLTable>
        </Column>
      ) : (
        <Column center="both" padding="vertical">
          アイテムがありません
        </Column>
      )}
      {paginationButtons}
    </Column>
  );
});
