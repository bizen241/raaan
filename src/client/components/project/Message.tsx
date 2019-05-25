import * as React from "react";
import { useContext } from "react";
import { langToMessages, Messages } from "../../intl/messages";
import { LangContext } from "./Context";

export const Message = React.memo<{
  id: keyof Messages;
}>(({ id }) => {
  const lang = useContext(LangContext);

  const messages = langToMessages[lang] || langToMessages.ja;

  return <>{messages[id]}</>;
});
