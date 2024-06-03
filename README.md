# Hide Code

## Description

Hide Code improves code readability, blurring sections that do not affect the logic, but are necessary, such as logs, metrics, among others. It can be activated and deactivated with a single click, allowing you to decide when you want to focus only on logical sections.

![Hide Code screenshot](https://github.com/LucasBermann/hide-code/edit/main/assets/example.gif)

### Settings

You must add regular expressions that will define the codes to be blurred in your VSCode settings, as in the example:

```json
{
    "hideCode.regex": [
        {
            "value": "console\\.log\\(([^)]+)\\).*",
            "config": "igm",
        },
        {
            "value": "log\\.send\\(([^)]+)\\).*",
            "config": "igm",
        }
    ]
}
```

By default, the code found will be #4F4F4F, however, you can define another color in your VSCode settings, as in the example:

```json
{
    "hideCode.regex": [
        {
            "value": "console\\.log\\(([^)]+)\\).*",
            "config": "igm",
        },
        {
            "value": "log\\.send\\(([^)]+)\\).*",
            "config": "igm",
        }
    ],
    "hideCode.color": "#FFFFFF"
}
```

Remember to reload the vscode window after updating the settings.

## Acknowledgments

This extension is inspired by [hide-comments](https://github.com/estruyf/vscode-hide-comments).

## License

This project is licensed under the [MIT License](LICENSE).
