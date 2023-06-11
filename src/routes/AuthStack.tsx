import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Register from '../screens/Register';
import Login from '../screens/Login';
import Landing from '../screens/Landing';

export type AuthStackParamList = {
  Register: undefined;
  Login: undefined;
  Landing: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Landing">
      <Stack.Screen
        name="Landing"
        component={Landing}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
