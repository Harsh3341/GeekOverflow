import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Pressable,
  TextInput,
  Image,
} from 'react-native';
import {useContext, useEffect, useState} from 'react';
import {AppwriteContext} from '../../appwrite/AppwriteContext';
import Snackbar from 'react-native-snackbar';
import {Config} from '../../utils/config';

const EditProfile = () => {
  const {appwrite, setIsLoggedIn, user, setUser, stale, setStale} =
    useContext(AppwriteContext);

  const [toggle, setToggle] = useState<boolean>(false);
  const [passToggle, setPassToggle] = useState<boolean>(false);
  const [image, setImage] = useState<any>(null);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [oldPassword, setOldPassword] = useState<string>('');

  const updateName = () => {
    try {
      const data = {
        name: name,
      };
      appwrite
        .updateName(data)
        .then((res: any) => {
          Snackbar.show({
            text: 'Name updated successfully',
            duration: Snackbar.LENGTH_SHORT,
          });
          setStale(true);
          setName('');
        })
        .catch((err: any) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const updateEmail = () => {
    try {
      const data = {
        email: email,
        password: password,
      };
      appwrite
        .updateEmail(data)
        .then((res: any) => {
          if (res) {
            Snackbar.show({
              text: 'Email updated successfully',
              duration: Snackbar.LENGTH_SHORT,
            });
            setStale(true);
            setEmail('');
            setPassword('');
          }
        })
        .catch((err: any) => {
          console.log(err);
          Snackbar.show({
            text: err.message,
            duration: Snackbar.LENGTH_SHORT,
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

  const updatePassword = () => {
    try {
      const data = {
        oldPassword: oldPassword,
        newPassword: newPassword,
      };
      appwrite
        .updatePassword(data)
        .then((res: any) => {
          if (res) {
            Snackbar.show({
              text: 'Password updated successfully',
              duration: Snackbar.LENGTH_SHORT,
            });
            setStale(true);
            setOldPassword('');
            setNewPassword('');
          }
        })
        .catch((err: any) => {
          console.log(err);
          Snackbar.show({
            text: err.message,
            duration: Snackbar.LENGTH_SHORT,
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setStale(false);
  }, [stale]);

  return (
    <ImageBackground
      source={require('../assets/Bg.jpg')}
      resizeMode="cover"
      blurRadius={10}
      imageStyle={{opacity: 0.5}}>
      <Pressable
        onPress={() => {
          setToggle(false);
          setPassToggle(false);
        }}>
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              color: 'black',
              opacity: 0.5,
              marginBottom: 20,
            }}>
            {user && user.name}
          </Text>
          <Image
            source={require('../assets/art.png')}
            style={{
              height: 100,
              width: 100,
              borderRadius: 50,
              marginBottom: 20,
            }}
          />

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#F2F2F2',
              borderRadius: 20,
              paddingVertical: 20,
              width: '90%',
              elevation: 10,
              shadowOffset: {width: 10, height: 10},
              shadowColor: 'black',
              shadowOpacity: 1.0,
            }}>
            <View
              style={{
                gap: 10,
                width: '80%',
              }}>
              <Text
                style={{
                  width: 246,
                  color: 'black',
                  opacity: 0.5,
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                Name
              </Text>
              <View>
                <TextInput
                  style={{
                    width: '100%',
                    color: 'black',
                    opacity: 0.5,
                    fontSize: 15,
                    fontWeight: 'bold',
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                  }}
                  placeholder={user && user.name}
                  onChangeText={text => setName(text)}
                  value={name}
                />
                <Text
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 10,
                    color: '#0400ff',
                    opacity: 0.5,
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}
                  onPress={() => updateName()}>
                  Update
                </Text>
              </View>
              <Text
                style={{
                  width: 246,
                  color: 'black',
                  opacity: 0.5,
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                Your Email Address
              </Text>
              <View>
                <TextInput
                  style={{
                    width: '100%',
                    color: 'black',
                    opacity: 0.5,
                    fontSize: 15,
                    fontWeight: 'bold',
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                  }}
                  placeholder={user && user.email}
                  onPressIn={() => setToggle(true)}
                  onChangeText={text => setEmail(text)}
                  value={email}
                />
                <Text
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 10,
                    color: '#0400ff',
                    opacity: 0.5,
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}
                  onPress={() => updateEmail()}>
                  Update
                </Text>
              </View>
              {toggle && (
                <>
                  <Text
                    style={{
                      width: 246,
                      color: 'black',
                      opacity: 0.5,
                      fontSize: 15,
                      fontWeight: 'bold',
                    }}>
                    Password
                  </Text>
                  <TextInput
                    style={{
                      width: '100%',
                      color: 'black',
                      opacity: 0.5,
                      fontSize: 15,
                      fontWeight: 'bold',
                      borderBottomColor: 'black',
                      borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                    value={password}
                  />
                </>
              )}
              {passToggle && (
                <>
                  <Text
                    style={{
                      width: 246,
                      color: 'black',
                      opacity: 0.5,
                      fontSize: 15,
                      fontWeight: 'bold',
                    }}>
                    Old Password
                  </Text>
                  <TextInput
                    style={{
                      width: '100%',
                      color: 'black',
                      opacity: 0.5,
                      fontSize: 15,
                      fontWeight: 'bold',
                      borderBottomColor: 'black',
                      borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                    placeholder="Old Password"
                    onChangeText={text => setOldPassword(text)}
                    value={oldPassword}
                  />
                  <Text
                    style={{
                      width: 246,
                      color: 'black',
                      opacity: 0.5,
                      fontSize: 15,
                      fontWeight: 'bold',
                    }}>
                    New Password
                  </Text>
                  <TextInput
                    style={{
                      width: '100%',
                      color: 'black',
                      opacity: 0.5,
                      fontSize: 15,
                      fontWeight: 'bold',
                      borderBottomColor: 'black',
                      borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                    placeholder="New Password"
                    onChangeText={text => setNewPassword(text)}
                    value={newPassword}
                  />
                </>
              )}
            </View>
          </View>
          <Pressable
            onPress={() => {
              setPassToggle(!passToggle);
              if (passToggle) {
                updatePassword();
              }
            }}>
            <View style={styles.buttons}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                Change Password
              </Text>
            </View>
          </Pressable>
        </View>
      </Pressable>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    backgroundColor: 'black',
    height: 35,
    width: 138,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
export default EditProfile;
