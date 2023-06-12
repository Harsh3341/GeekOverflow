import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {useContext, useEffect, useState} from 'react';

import {AppwriteContext} from '../appwrite/AppwriteContext';

const Profile = ({navigation}: any): JSX.Element => {
  const {appwrite, setIsLoggedIn, user, setUser} = useContext(AppwriteContext);
  const handleLogout = () => {
    appwrite.logout().then(() => {
      setIsLoggedIn(false);
      setUser(null);
      Snackbar.show({
        text: 'Logged out successfully',
        duration: Snackbar.LENGTH_SHORT,
      });
    });
  };

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
