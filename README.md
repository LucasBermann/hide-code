# Hide Code

## Description

Hide Code improves code readability by blurring sections that do not affect the logic but are necessary, such as logs, metrics, and other similar elements. With a simple toggle (or Ctrl+Alt+H), you can choose when to focus only on the essential logical sections.

![Hide Code screenshot](https://raw.githubusercontent.com/LucasBermann/hide-code/main/assets/example.gif)

## Features

- **Toggle Visibility:** Easily hide and show irrelevant code sections with a single click or a keyboard shortcut.
- **Customizable Regex:** Define your own regular expressions to specify which code sections to blur.
- **Custom Color:** Choose your preferred color to blur the code sections.

## Getting Started

### Installation

1. Install the Hide Code extension from the [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=LucasBermann.hide-code).
2. Reload VSCode to activate the extension.

### Usage

1. Open your VSCode settings (`Ctrl+,` or `Cmd+,` on macOS).
2. Add your regular expressions to define which code sections to blur. For example:

    ```json
    {
        "hideCode.regex": [
            {
                "value": "console\\.log\\(([^)]+)\\).*",
                "config": "igm"
            },
            {
                "value": "log\\.send\\(([^)]+)\\).*",
                "config": "igm"
            }
        ]
    }
    ```

3. (Optional) Customize the blur color:

    ```json
    {
        "hideCode.regex": [
            {
                "value": "console\\.log\\(([^)]+)\\).*",
                "config": "igm"
            },
            {
                "value": "log\\.send\\(([^)]+)\\).*",
                "config": "igm"
            }
        ],
        "hideCode.color": "#FFFFFF"
    }
    ```

4. Reload the VSCode window after updating the settings.

### Keyboard Shortcuts

- **Toggle Hide/Show:** `Ctrl+Alt+H`

## Acknowledgments

This extension is inspired by [hide-comments](https://github.com/estruyf/vscode-hide-comments).

## License

This project is licensed under the [MIT License](https://github.com/LucasBermann/hide-code/blob/main/LICENSE).

---

Feel free to suggest improvements or report issues on the [GitHub repository](https://github.com/LucasBermann/hide-code).

---

By using this extension, you agree to the terms of the MIT License. Thank you for using Hide Code!
