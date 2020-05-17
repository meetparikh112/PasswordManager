//https://codesandbox.io/s/react-dynamic-form-fields-3fjbd?from-embed=&file=/src/index.js
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  Keyboard,
} from 'react-native';
import {Button, CheckBox} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {FormInput, FormButton, ErrorMessage} from './Center';

import Clipboard from '@react-native-community/clipboard';
import {useFocusEffect} from '@react-navigation/native';
import {createData, editData, deleteData} from './../db/operations';
import {IconButton, withTheme, Snackbar} from 'react-native-paper';
import {Dimensions} from 'react-native';
import {Input} from 'react-native-elements';
export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get(
  'window',
);

// const validationSchema = Yup.object().shape({
//   name: Yup.string()
//     .label('Name')
//     .required()
//     .min(2, 'Must have at least 2 characters'),
//   email: Yup.string()
//     .label('Email')
//     .email('Enter a valid email')
//     .required('Please enter a registered email'),
//   password: Yup.string()
//     .label('Password')
//     .required()
//     .min(6, 'Password should be at least 6 characters '),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref('password')], 'Confirm Password must matched Password')
//     .required('Confirm Password is required'),
//   check: Yup.boolean().oneOf([true], 'Please check the agreement'),
// });

function Signup(props) {
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
  const RouteParams = route.params;
  const [visible, setVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused

      if (!RouteParams.createFlag && RouteParams.item != 'No-Item') {
        //Edit PAssword
        setId(RouteParams.item.id);
        setName(RouteParams.item.name);
        setLogin(RouteParams.item.login);
        setPassword(RouteParams.item.password);
        setWebsite(RouteParams.item.website);
        setNotes(RouteParams.item.notes);
        setIsCreate(0);

        props.navigation.setOptions({
          title: 'Edit Password',
          headerStyle: {
            backgroundColor: 'tomato',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTintColor: '#fff',
          headerRight: () => (
            <IconButton
              icon="delete"
              size={30}
              color="#fff"
              mode="contained"
              dark={true}
              onPress={() => {
                deleteData(RouteParams.item.id)
                  .then(data => {
                    navigation.goBack();
                  })
                  .catch(error => {
                    console.log('DeleteData ERROR', error);
                  });
              }}
            />
          ),
        });
      } else {
        //Create PAssword
        props.navigation.setOptions({
          title: 'Add Password',
          headerStyle: {
            backgroundColor: 'tomato',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTintColor: '#fff',
          headerRight: () => <></>,
        });
      }
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

  const handleOnSignup = (values, actions) => {
    if (isCreate) {
      createData(
        values.name,
        values.login,
        values.password,
        values.website,
        values.notes,
      )
        .then(data => {
          navigation.navigate('Home');
          actions.setSubmitting(false);
        })
        .catch(error => {
          console.log('createData ERROR', error);
        });
    } else {
      editData(
        id,
        values.name,
        values.login,
        values.password,
        values.website,
        values.notes,
      )
        .then(data => {
          navigation.navigate('Home');
          actions.setSubmitting(false);
        })
        .catch(error => {
          console.log('editPassword ERROR', error);
        });
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      onPress={Keyboard.dismiss}
      // enabled behavior="padding"
    >
      <ScrollView>
        <Formik
          initialValues={{
            name: name,
            login: login,
            password: password,
            website: website,
            notes: notes,
          }}
          enableReinitialize={true}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              // alert(JSON.stringify(values, null, 2));
              handleOnSignup(values, actions);
              actions.setSubmitting(false);
            }, 500);
          }}
          // validationSchema={validationSchema}
        >
          {({
            handleChange,
            values,
            handleSubmit,
            errors,
            isValid,
            touched,
            handleBlur,
            isSubmitting,
            setFieldValue,
          }) => (
            <>
              {console.log('values', values)}
              <FormInput
                name="name"
                label="Name"
                value={values.name}
                onChangeText={handleChange('name')}
                placeholder="Enter your full name"
                iconName="md-person"
                iconColor="#2C384A"
                onBlur={handleBlur('name')}
              />
              <FormInput
                name="login"
                label="Login"
                value={values.login}
                onChangeText={handleChange('login')}
                placeholder="Enter login"
                autoCapitalize="none"
                iconName="ios-mail"
                iconColor="#2C384A"
                onBlur={handleBlur('login')}
              />

              <View style={styles.passwordViewContainer}>
                <FormInput
                  label="Password"
                  value={values.password}
                  secureTextEntry={showPassword}
                  inputStyle={{flex: 1, paddingRight: 85}}
                  onChangeText={handleChange('password')}
                  // width={SCREEN_WIDTH - 100}
                />
                <IconButton
                  icon={passwordIcon}
                  style={{position: 'absolute', top: 33, right: 52}}
                  size={30}
                  color="tomato"
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
                  style={{position: 'absolute', top: 33, right: 8}}
                  size={30}
                  color="tomato"
                  mode="contained"
                  dark={true}
                  onPress={() => {
                    Clipboard.setString(values.password);
                    setVisible(true);
                  }}
                />
              </View>
              <FormInput
                name="website"
                label="Website"
                value={values.website}
                onChangeText={handleChange('website')}
                placeholder="Enter website"
                autoCapitalize="none"
                iconName="ios-mail"
                iconColor="#2C384A"
                onBlur={handleBlur('website')}
              />
              <FormInput
                name="notes"
                label="Notes"
                value={values.notes}
                onChangeText={handleChange('notes')}
                placeholder="Enter notes"
                autoCapitalize="none"
                iconName="ios-mail"
                iconColor="#2C384A"
                onBlur={handleBlur('notes')}
              />
              <View style={styles.buttonContainer}>
                <FormButton
                  buttonType="outline"
                  onPress={handleSubmit}
                  title={isCreate ? 'Add' : 'Update'}
                  buttonColor="#F57C00"
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                />
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
  },
  logoContainer: {
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonContainer: {
    margin: 25,
  },
  checkBoxContainer: {
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
});

export default Signup;
