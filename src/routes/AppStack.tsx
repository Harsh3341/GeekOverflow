import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Navbar from '../components/Navbar';
import Post from '../components/Post';
import EditPost from '../components/EditPost';
import EditProfile from '../components/EditProfile';

export type AppStackParamList = {
  Navbar: undefined;
  Post: undefined;
  Edit: {question: any};
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
        name="Edit"
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
