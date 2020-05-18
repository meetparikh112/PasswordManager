import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import {useFocusEffect} from '@react-navigation/native';
import {createData, editData, deleteData} from './../db/operations';
import {IconButton, withTheme, Button, Snackbar} from 'react-native-paper';
import {Dimensions} from 'react-native';
import {Input} from 'react-native-elements';
export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get(
  'window',
);
import {Center} from './Center';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // margin: 10,
    alignItems: 'center',
    // backgroundColor: 'red', //
  },
  text: {
    color: '#101010',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  containerStyle: {
    backgroundColor: '#fff',
    marginBottom: 7,
    margin: 3,
  },
  labelStyle: {
    color: '#101010',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputStyle: {
    flex: 1,
    // paddingRight: 45, //for bug with icon
  },
  inputStylePassword: {
    flex: 1,
    paddingRight: 85, //for bug with icon
  },
  inputContainerStyle: {
    borderBottomColor: 'tomato',
    margin: 3,
    width: SCREEN_WIDTH - 50,
  },
  passwordViewContainer: {},
  icon: {
    position: 'absolute',
    top: 33,
    right: 52,
  },
  iconCopy: {
    position: 'absolute',
    top: 33,
    right: 8,
  },
  bottomButtons: {
    margin: 10,
  },
  Button: {
    width: '80%',
  },
});

function UselessTextInput(props) {
  // console.log(props);
  // console.log(props.label);

  return (
    <Input
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      containerStyle={styles.containerStyle}
      labelStyle={styles.labelStyle}
      inputStyle={
        props.label == 'Password'
          ? styles.inputStylePassword
          : styles.inputStyle
      }
      autoFocus={false}
      autoCapitalize="none"
      keyboardAppearance="dark"
      autoCorrect={false}
      blurOnSubmit={false}
      inputContainerStyle={styles.inputContainerStyle}
      // width={SCREEN_WIDTH - 100}
    />
  );
}

function PasswordForm(props) {
  const {route, navigation} = props;
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [website, setWebsite] = useState('');
  const [notes, setNotes] = useState('');
  const [isCreate, setIsCreate] = useState(1);
  const [showPassword, setShowPassword] = useState(true);
  const [passwordIcon, setPasswordIcon] = useState('eye');
  // const RouteParams = route.params;
  const [visible, setVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      // if (!RouteParams.createFlag && RouteParams.item != 'No-Item') {
      //   //Edit PAssword
      //   setId(RouteParams.item.id);
      //   setName(RouteParams.item.name);
      //   setLogin(RouteParams.item.login);
      //   setPassword(RouteParams.item.password);
      //   setWebsite(RouteParams.item.website);
      //   setNotes(RouteParams.item.notes);
      //   setIsCreate(0);

      //   props.navigation.setOptions({
      //     title: 'Edit Password',
      //     headerStyle: {
      //       backgroundColor: props.theme.colors.primary,
      //     },
      //     headerTitleStyle: {
      //       fontWeight: 'bold',
      //     },
      //     headerTintColor: '#fff',
      //     headerRight: () => (
      //       <IconButton
      //         icon="delete"
      //         size={30}
      //         color="#fff"
      //         mode="contained"
      //         dark={true}
      //         onPress={() =>
      //           deleteData(RouteParams.item.id)
      //             .then(data => {
      //               navigation.navigate('Home');
      //             })
      //             .catch(error => {
      //               console.log('DeleteData ERROR', error);
      //             })
      //         }
      //       />
      //     ),
      //   });
      // } else {
      //Create PAssword
      props.navigation.setOptions({
        title: 'Add Password',
        headerStyle: {
          backgroundColor: props.theme.colors.primary,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTintColor: '#fff',
        headerRight: () => <></>,
      });
      // }
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        setId('');
        setName('');
        setLogin('');
        setPassword('');
        setWebsite('');
        setNotes('');
      };
    }, []),
  );

  const createPassword = () => {
    createData(name, login, password, website, notes)
      .then(data => {
        navigation.navigate('Home');
      })
      .catch(error => {
        console.log('createData ERROR', error);
      });
  };

  const editPassword = () => {
    editData(id, name, login, password, website, notes)
      .then(data => {
        navigation.navigate('Home');
      })
      .catch(error => {
        console.log('editPassword ERROR', error);
      });
  };
  return (
    // <TouchableWithoutFeedback>
    <Center>
      <Snackbar
        visible={visible}
        onDismiss={() => {
          setVisible(false);
        }}
        duration={3000}>
        Password copied to clipboard.
      </Snackbar>
      <View style={styles.container}>
        <UselessTextInput
          label="Name"
          value={name}
          onChangeText={name => setName(name)}
          width={SCREEN_WIDTH - 100}
        />
        <UselessTextInput
          label="Login"
          value={login}
          onChangeText={login => setLogin(login)}
          width={SCREEN_WIDTH - 100}
        />
        <View style={styles.passwordViewContainer}>
          <UselessTextInput
            label="Password"
            value={password}
            secureTextEntry={showPassword}
            inputStyle={styles.inputStylePassword}
            onChangeText={password => {
              setPassword(password);
              setShowPassword(showPassword);
              setPasswordIcon(passwordIcon);
            }}
            width={SCREEN_WIDTH - 100}
          />
          <IconButton
            icon={passwordIcon}
            style={styles.icon}
            size={30}
            color={props.theme.colors.primary}
            mode="contained"
            dark={true}
            onPress={() => {
              if (showPassword) {
                setShowPassword(false);
                setPasswordIcon('eye-off');
                setPassword(password);
              } else {
                setShowPassword(true);
                setPasswordIcon('eye');
                setPassword(password);
              }
            }}
          />
          <IconButton
            icon="content-copy"
            style={styles.iconCopy}
            size={30}
            color={props.theme.colors.primary}
            mode="contained"
            dark={true}
            onPress={() => {
              Clipboard.setString(password);
              setVisible(true);
            }}
          />
        </View>

        <UselessTextInput
          label="Website"
          value={website}
          onChangeText={website => setWebsite(website)}
          width={SCREEN_WIDTH - 100}
        />
        <UselessTextInput
          label="Notes"
          value={notes}
          onChangeText={notes => setNotes(notes)}
          width={SCREEN_WIDTH - 100}
        />

        <View style={styles.bottomButtons}>
          {isCreate ? (
            <Button
              mode="contained"
              dark={true}
              color={props.theme.colors.primary}
              onPress={() => createPassword()}>
              Add
            </Button>
          ) : (
            <Button mode="contained" dark={true} onPress={() => editPassword()}>
              Edit
            </Button>
          )}
        </View>
      </View>
    </Center>
    // </TouchableWithoutFeedback>
  );
}

export default withTheme(PasswordForm);
