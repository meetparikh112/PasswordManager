# Password Manager

Password Manager for android device with offline Realm database.

## Description
Its simple template, anyone can add their desire encryption and store the user's multiple Account's password. It has common Fromlik and yup Form controls for input validation. 

### Dependencies

* Android Developemnt Environment

### Installing

```
git clone https://github.com/meetparikh112/PasswordManager.git
yarn
```

### Executing app (Developing mode)
To run the app first setup android envirement in you macine using React-native CLI QuickStart. [Reference!](https://reactnative.dev/docs/environment-setup)
```
npx react-native run-android
```
or
```
yarn android
```

### Executing app (Apk create)
to Create apk you have to setup keystore. [Reference!](https://www.instamobile.io/android-development/generate-react-native-release-build-android/)

```
cd android
gradlew assembleRelease
```
or
```
yarn android
```


## License

This project is licensed under the [MIT] License - see the LICENSE.md file for details
