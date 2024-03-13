This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Clone the Project

Firstly you can clone the project from this repository: https://github.com/sagarc91/CognizantRNProject.git

## Step 2: Start the Metro Server

You will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
## Step 1: Start your Application
npx react-native run-android

Let Metro Bundler run in its _own_ terminal. 

To run it on iOS
npx react-native run-ios
```

If everything is set up _correctly_, you should see your new app running in your Android emulator and iOS simulator 

## Step 3: Modifying your App
To make changes to your app, navigate to the files associated with the following modules:

iOS Troubleshooting for RNKeychainManager: If you encounter issues related to RNKeychainManager in iOS, temporarily remove the problematic lines from the file to ensure the app functions properly. Investigate the root cause of the failure with RNKeychainManager. This issue may be related to linking problems, similar to those experienced with vector-icons. While this issue is not critical, it should be addressed.

Home Screen: The Home Screen displays a list of products.

Search Screen: The Search Screen allows users to search for products by name or title. Note that live cursor search functionality has not been implemented.

Account Screen: The Account Screen shows a welcome message along with a logout button. Additionally, if a user is logged in on the Home Screen, a floating action button (FAB) will be visible. Otherwise, the FAB will not be displayed.

Product Screen and Add Product Screen: These screens are static and do not include any interactive elements or actions.
