import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Navbar from '../components/Navbar';
import Post from '../screens/Post';
import EditPost from '../screens/EditPost';
import EditProfile from '../screens/profile/EditProfile';

export type AppStackParamList = {
  Navbar: undefined;
  Post: undefined;
  EditPost: {question: any};
  EditProfile: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Navbar">
      <Stack.Screen
        name="Navbar"
        component={Navbar}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Post"
        component={Post}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditPost"
        component={EditPost}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
