import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Navbar from '../components/Navbar';

export type AppStackParamList = {
  Navbar: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Navbar"
        component={Navbar}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
