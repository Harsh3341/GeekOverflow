import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Feed from '../screens/Feed';
import Create from '../screens/Create';
import Profile from '../screens/Profile';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Ionicons';

const Tab = createMaterialBottomTabNavigator();

const Navbar = () => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#000000"
      inactiveColor="#3e2465"
      barStyle={{
        backgroundColor: '#ffffff',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      labeled={false}>
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarLabel: 'Feed',
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="Create"
        component={Create}
        options={{
          tabBarLabel: 'Create',
          tabBarIcon: ({color}) => (
            <Icon2 name="create-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <Icon name="profile" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Navbar;
