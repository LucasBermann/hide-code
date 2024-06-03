import { State } from "./utils/state";
import * as vscode from "vscode";
import { hideCode } from "./services/hide-code";
import { StateLabel } from "./models/enum";

export const CONFIG_SECTION = "hideCode";

export const CONTEXT_KEYS = {
  comments: `${CONFIG_SECTION}.commentsEnabled`,
  regex: `${CONFIG_SECTION}.regexEnabled`,
  isHidden: `${CONFIG_SECTION}.isHidden`,
};

export const STATE_KEYS = {
  regexEnabled: `${CONFIG_SECTION}.regexEnabled`,
};

export async function activate(context: vscode.ExtensionContext) {
  const state = new State(context);

  const { subscriptions } = context;

  hideCode(state);

  const hideConsoleCmd = vscode.commands.registerCommand(
    "hidecode.regex.hide",
    async () => {
      hideCode(state, true);
    }
  );

  const showConsoleCmd = vscode.commands.registerCommand(
    "hidecode.regex.show",
    async () => {
      hideCode(state);
    }
  );

  vscode.window.onDidChangeActiveTextEditor(
    async (e) => {
      const hideLines = await state.getGlobalState<boolean>(StateLabel.HIDDEN);

      if (hideLines) {
        hideCode(state, true);
        return;
      }
      hideCode(state);
    },
    null,
    context.subscriptions
  );

  vscode.workspace.onDidChangeConfiguration(
    async (event) => {
      if (event.affectsConfiguration(CONFIG_SECTION)) {
        hideCode(state);
      }
    },
    null,
    context.subscriptions
  );

  vscode.workspace.onDidChangeTextDocument(
    async (event) => {
      if (vscode.window.activeTextEditor && event.document === vscode.window.activeTextEditor.document) {
        const hideLines = await state.getGlobalState<boolean>(StateLabel.HIDDEN);

        if (hideLines) {
          hideCode(state, true);
          return;
        }
        hideCode(state);
      }
    },
    null,
    context.subscriptions
  );

  subscriptions.push(hideConsoleCmd);
  subscriptions.push(showConsoleCmd);
}

export function deactivate() {}
