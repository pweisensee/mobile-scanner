# mobile-scanner

React Native application for using the device’s camera to scan QR codes and store the collected text for further emailing and tracking emails sent.

# ABOUT

## Start

### App starts empty, just start scanning to see it in action.

<img src="./docs/empty_scan_screen.jpg" style="max-width: 49%;">
<img src="./docs/empty_email_tab.jpg" style="max-width: 49%;">

<br/>
<br/>

### Scan some QR Codes:

<img src="./docs/active_scan.jpg" style="max-width: 33%;">
<img src="./docs/first_scan.jpg" style="max-width: 33%;">
<img src="./docs/many_scans.jpg" style="max-width: 33%;">

<br/>
<br/>

### Select one or many. Tap <img src="./docs/trash_icon.jpg" width="20"> icon to delete or <img src="./docs/send_email_icon.jpg" width="20"> to send an email:

<img src="./docs/3_scans_selected.jpg" style="max-width: 50%;">

<br/>
<br/>

### Tap `Send Email` to send:

<img src="./docs/send_email_test_address.jpg" style="max-width: 49%;">
<img src="./docs/email_sent.jpg" style="max-width: 49%;">

<br/>
<br/>

### Pull-to-refresh on the `Email` tab to get the lastest activity from SendGrid

<img src="./docs/email_history.jpg" style="max-width: 50%;">

<br/>
<br/>
<br/>

# DEVELOPMENT

### PREREQUISITES

-   global npm packages:

    -   `expo-cli`
    -   `npm`
    -   `typescript`

-   local environment variables for secret keys:
    -   set `SENDGRID_API_KEY=XXXXX` in the root folder in a `.env` file

### START

-   Clear out previous build cache
    -   `watchman watch-del-all`
    -   `rm -rf node_modules/.cache/babel-loader/*`
    -   `rm -fr $TMPDIR/metro*`
-   Run `yarn` to install dependencies
-   Run `yarn start` to start the local Expo server
-   Scan QR code with Expo app on device to preview app
