import { ExtensionContext } from "vscode";
import { StateLabel } from "../models/enum";

export class State {
  constructor(private context: ExtensionContext) {}

  public async getGlobalState<T>(stateKey: StateLabel): Promise<T | undefined> {
    return this.context.globalState.get(stateKey);
  }

  public async getWorkspaceState<T>(stateKey: StateLabel): Promise<T | undefined> {
    return await this.context.workspaceState.get(stateKey);
  }

  public async setGlobalState<T>(stateKey: StateLabel, value: T): Promise<void> {
    await this.context.globalState.update(stateKey, value);
  }

  public async setWorkspaceState<T>(stateKey: StateLabel, value: T): Promise<void> {
    await this.context.workspaceState.update(stateKey, value);
  }
}
