export interface SettingType {
  persona: string;
  examples: { content: string }[];
}

export interface SettingParmsType {
  settings: SettingType;
  teamCode: string;
}
