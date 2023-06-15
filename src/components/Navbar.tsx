import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Feed from '../screens/Feed';
import Create from '../screens/Create';
import Profile from '../screens/profile/Profile';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {useState} from 'react';

const Tab = createMaterialBottomTabNavigator();

const Navbar = ({navigation}: any) => {
  const [refresh, setRefresh] = useState(false);

  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#000000"
      inactiveColor="#6a6a6a"
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
          tabBarIcon: ({color}) => <Icon name="user" color={color} size={26} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Navbar;
