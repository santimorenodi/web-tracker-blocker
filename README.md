# MiSanti Tracker Blocker 🚀

A browser extension designed to help you regain control over your time and avoid dopamine overload on social media.

## ✨ Features

- **Automated Time Tracking:** Monitors time spent on addictive domains (currently configured for `x.com`).
- **Strict Time Limits:** Sets a maximum usage time (3 minutes) before triggering a cooling-off period.
- **Cool-off Blocks:** Once the limit is reached, it blocks access for a full hour to help you break the scrolling loop.
- **Custom Block Page:** Redirects to a beautiful, focused page when time is up.
- **Cross-Browser Support:** Works on both **Chrome** and **Firefox** (including Firefox for Android).

## 🛠️ How it Works

The extension runs in the background and:
1. Detects when you are on a target domain.
2. Tracks your active session time second by second.
3. If you exceed the limit, it redirects you to a `blocked.html` page.
4. It uses local storage to ensure that closing the browser or tab doesn't reset your timer during a block session.

## 🚀 Installation

### For Developers / Manual Install:

#### Google Chrome / Chromium Browsers:
1. Clone this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (top right toggle).
4. Click **Load unpacked** and select the root directory of this project.
   - *Note: The extension uses `manifest_chrome.json` for Chrome. Rename it to `manifest.json` if you are targeting Chrome specifically.*

#### Mozilla Firefox:
1. Clone this repository.
2. Navigate to `about:debugging#/runtime/this-firefox`.
3. Click **Load Temporary Add-on...** and select `manifest.json`.

## 📦 Building

The project includes a `build.bat` script for packaging the extension. It creates a `dist/` folder with the necessary files for distribution.

## ⚙️ Configuration

Currently, the limits are hardcoded in `background.js`:
- `targetDomain`: The site to monitor (default: `x.com`).
- `limitMs`: Usage time limit (default: 3 mins).
- `blockMs`: Block duration (default: 1 hour).

## 📄 License

MIT

---
*Made with ❤️ to improve digital well-being.*
