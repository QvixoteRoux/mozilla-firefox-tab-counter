# Tab Counter

A minimal Firefox extension that shows the number of open tabs directly on
the toolbar icon, as `tabsInCurrentWindow/totalTabs`.

## Features

- Live badge showing `<tabs in this window>/<tabs across all windows>`
- Updates automatically when tabs are created, closed, moved between
  windows, or the focused window changes
- No configuration, no network access — runs entirely locally

## Permissions

- `tabs` — required to read tab and window counts

## Installation

### Temporary (for testing)

1. Open `about:debugging#/runtime/this-firefox` in Firefox
2. Click **Load Temporary Add-on…**
3. Select `manifest.json`

This installs the extension until Firefox restarts.

### Permanent (signed, self-distributed)

Firefox requires extensions to be signed to install permanently. This
extension is distributed as an unlisted (self-distribution) add-on:

1. Package `manifest.json` and `background.js` into a zip
   (see `tab-counter-1.0.zip`)
2. Submit it at [addons.mozilla.org/developers](https://addons.mozilla.org/developers/)
   under **Submit a New Add-on → On your own**
3. Download the signed `.xpi` Mozilla returns
4. Install it via drag-and-drop into a Firefox window, or through
   `about:addons` → gear icon → **Install Add-on From File**

## License

MIT — see [LICENSE](LICENSE).
