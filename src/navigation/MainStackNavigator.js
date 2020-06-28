import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {
  Provider as PaperProvider,
  DefaultTheme,
  withTheme,
} from 'react-native-paper';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import Home from '../screens/Home';
import CreateEditForm from '../screens/CreateEditForm';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
    success: 'green',
  },
};

const Stack = createStackNavigator();

function MainStackNavigator() {
  useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <PaperProvider theme={theme}>
      <StatusBar backgroundColor="#000000" barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            // gestureDirection: 'horizontal',
            gestureEnabled: true,
            headerMode: 'float',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTintColor: '#fff',
            headerBackTitleVisible: false,
          }}
          headerMode="float">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              // headerShown: false,
              title: 'Password Manager',
            }}
            // screenOptions={{
            //   headerStyle: {
            //     backgroundColor: theme.colors.primary,
            //   },
            //   headerTitleStyle: {
            //     fontWeight: 'bold',
            //   },
            //   headerTintColor: '#fff',
            // }}
          />
          <Stack.Screen
            name="HelloForm"
            component={CreateEditForm}
            options={{title: 'Create/EditForm'}}
            screenOptions={{
              gestureResponseDistance: 'horizontal',
              gestureEnabled: true,
              headerBackTitleVisible: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default withTheme(MainStackNavigator);
