import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {useContext, useEffect, useState} from 'react';

import {AppwriteContext} from '../appwrite/AppwriteContext';

type UserObj = {
  email: string;
  name: String;
};

const Profile = ({navigation}: any): JSX.Element => {
  const [user, setUser] = useState<UserObj>();
  const {appwrite, setIsLoggedIn} = useContext(AppwriteContext);

  const handleLogout = () => {
    appwrite.logout().then(() => {
      setIsLoggedIn(false);
      Snackbar.show({
        text: 'Logged out successfully',
        duration: Snackbar.LENGTH_SHORT,
      });
    });
  };

  useEffect(() => {
    appwrite.getCurrentUser().then(res => {
      if (res) {
        const user: UserObj = {
          email: res.email,
          name: res.name,
        };
        setUser(user);
      }
    });
  }, [appwrite]);

  return (
    <View style={styles.container}>
      {user && (
        <View>
          <Text>Name:{user.name}</Text>
          <Text>Email:{user.email}</Text>
        </View>
      )}
      <Pressable style={styles.buttons} onPress={handleLogout}>
        <Text style={{color: 'white'}}>Logout</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3C7',
    height: '100%',
    paddingHorizontal: 43,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    backgroundColor: 'black',
    height: 46,
    width: 150,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 63,
  },
});

export default Profile;
