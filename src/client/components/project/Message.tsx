import * as React from "react";
import { useContext } from "react";
import { langToMessages, Messages } from "../../intl/messages";
import { SettingsContext } from "./Context";

export const Message = React.memo<{
  id: keyof Messages;
}>(({ id }) => {
  const settings = useContext(SettingsContext);
  const lang = settings["ui.lang"];

  const messages = langToMessages[lang] || langToMessages.ja;

  return <>{messages[id]}</>;
});
