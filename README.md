# Local development
These instructions should get you set up ready to work on New APP 🙌

## Getting Started
* There are some prerequisites required for local setup of React Native CLI in local eg. React Native command line interface, a JDK, and Android Studio.
* Follow the instruction as per your OS: https://reactnative.dev/docs/environment-setup

You can use any IDE or code editing tool for developing on any platform. Use your favorite!

## Install the node modules
* Open Project Folder
* Run "npm install"

## Running the Android app 🤖
* run cd android
* ./gradlew clean
* To run a on a **Development Emulator**: `npm run android`
* Changes applied to Javascript will be applied automatically, any changes to native code will require a recompile

## Running the iOS app 📱
* run cd ios
* pod install
* To run a on a **Development Simulator**: `npm run ios`
* Changes applied to Javascript will be applied automatically, any changes to native code will require a recompile
