import { UserSettings } from "../../../shared/api/entities";

export type SettingEditor<K extends keyof UserSettings> = React.FunctionComponent<{
  value: UserSettings[K];
  onChange: (value: UserSettings[K]) => void;
}>;
