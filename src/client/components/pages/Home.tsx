import { Trans } from "@lingui/react";
import * as React from "react";
import { connector } from "../../reducers";

export const Home = connector(
  () => ({}),
  () => ({}),
  ({}) => {
    return (
      <div>
        <main>
          <h1>Typing</h1>
          <a href="/auth/github">
            <Trans>ログイン</Trans>
          </a>
          /
          <a href="/logout">
            <Trans>ログアウト</Trans>
          </a>
        </main>
      </div>
    );
  }
);
