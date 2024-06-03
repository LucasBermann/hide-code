import { workspace } from "vscode";
import { ConfigLabels, DefaultConfig } from "../models/enum";

export class Setting {
  static getSetting<T>(key: ConfigLabels): T | undefined {
    const config = workspace.getConfiguration(DefaultConfig.SECTION);
    return config.get<T>(key);
  }

  static updateSetting<T>(key: ConfigLabels, value: T) {
    const config = workspace.getConfiguration(DefaultConfig.SECTION);
    return config.update(key, value);
  }
}
