# Mobile Scanner

An Expo app for scanning QR codes, keeping a private on-device history, opening scanned links, and sharing selected scans through the system email composer.

The app does not embed an email-service credential or upload scan history to a server. Existing scan history from the previous Redux Persist store is migrated automatically on first launch.

## Requirements

- Node.js 22.13 or newer
- Yarn 4 through Corepack
- Xcode 26.4 or newer for iOS builds
- Android SDK 36 for Android builds

## Development

```sh
corepack enable
yarn install --immutable
yarn start
```

Run the native app locally:

```sh
yarn ios
yarn android
```

The camera cannot scan a real QR code in the iOS Simulator. Email composition also requires a configured mail account on a physical iOS device; the app falls back to the system share sheet when mail is unavailable.

## Verification

```sh
yarn validate
yarn export:ios
yarn export:android
```

After changing native dependencies or Expo SDK versions, create fresh iOS and Android builds before publishing an update.
