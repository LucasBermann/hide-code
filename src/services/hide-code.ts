import { DecorationOptions, Range, TextEditor, TextEditorDecorationType, Uri, window } from "vscode";
import { IRegularExpression } from "../models/regular-expression";
import { ConfigLabels, DefaultConfig } from "../models/enum";
import { State } from "../utils/state";
import { Setting } from "../utils/setting";
import * as path from 'path';
import { setHiddenState } from "./update-hide-state";

const iconPath = Uri.file(path.join(__dirname, '..', 'assets', 'icons', 'text.svg'));
const iconDecorationType = window.createTextEditorDecorationType({
  gutterIconPath: iconPath
});

let customTextColorDecorationType: TextEditorDecorationType;

export const hideCode = async (state: State, hide = false) => {
  const expressions = Setting.getSetting<IRegularExpression[]>(ConfigLabels.REGEX) || [];
  
  const editor = window.activeTextEditor;
  if (!editor) {
    return;
  }

  const decorators: DecorationOptions[] = [];

  for (const expression of expressions) {
    if (expression.value) {
      decorators.push(...getDecorators(editor, hide, expression));
    }    
  }

  if (!customTextColorDecorationType) {
    const textColor = Setting.getSetting<string>(ConfigLabels.COLOR);
    customTextColorDecorationType = window.createTextEditorDecorationType({
      color: textColor || DefaultConfig.COLOR
    });
  }

  editor.setDecorations(iconDecorationType, decorators);
  editor.setDecorations(customTextColorDecorationType, decorators);

  await setHiddenState(state, hide);
};

const getDecorators = (editor: TextEditor, hide: boolean, expression: IRegularExpression): DecorationOptions[] => {
  const decorators: DecorationOptions[] = [];
  if (hide) {
    const regexConfig = RegExp(expression.value, expression.config || DefaultConfig.EXPRESSION_FLAG);
    const text = editor.document?.getText() ?? '';
    let match;
    while (match = regexConfig.exec(text)) {
      if (match?.[0]) {
        const positionOfMatched = match[0].indexOf(match[0]);
        const start = editor.document.positionAt(match.index + positionOfMatched);
        const end = editor.document.positionAt(match.index + positionOfMatched + match[0].length);
        const range = new Range(start, end);

        decorators.push({ range });
      }        
    }
  }

  return decorators;
};
