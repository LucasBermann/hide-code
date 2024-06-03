import { commands } from "vscode";
import { State } from "../utils/state";
import { StateLabel } from "../models/enum";

export const setHiddenState = async (extension: State, value: boolean) => {
    await extension.setGlobalState(StateLabel.HIDDEN, value);
    await commands.executeCommand('setContext', StateLabel.HIDDEN, value);
};
