# mobile-scanner

React Native application for using the device’s camera to scan QR codes and store the collected text for further emailing and tracking emails sent.

## DEVELOPMENT

### REQUIRED

-   global npm packages:

    -   `expo-cli`
    -   `npm`
    -   `typescript`

-   local environment variables for secret keys:
    -   set `SENDGRID_API_KEY=XXXXX` in the root folder in a `.env` file

### START

-   Clear out previous build cache `rm -rf node_modules/.cache/babel-loader/*`
-   Run `yarn start` to start the local Expo server
-   Scan QR code with Expo app on device to preview app
