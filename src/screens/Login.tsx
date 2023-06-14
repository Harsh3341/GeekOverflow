import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useContext, useState} from 'react';
import {AppwriteContext} from '../appwrite/AppwriteContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../routes/AuthStack';
import Snackbar from 'react-native-snackbar';

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const Login = ({navigation}: LoginScreenProps): JSX.Element => {
  const {appwrite, setIsLoggedIn} = useContext(AppwriteContext);
  const [error, setError] = useState<string>('');

  const [credintials, setCredintials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: {target: {name: any; value: any}}) => {
    setCredintials({...credintials, [e.target.name]: e.target.value});
  };

  const handleLogin = () => {
    if (credintials.email.length < 1 || credintials.password.length < 1) {
      setError('Please fill all the fields');
    } else {
      const user = {
        email: credintials.email,
        password: credintials.password,
      };
      appwrite
        .login(user)
        .then((res: any) => {
          if (res) {
            setIsLoggedIn(true);
            Snackbar.show({
              text: 'Logged in successfully',
              duration: Snackbar.LENGTH_SHORT,
            });
          }
        })
        .catch(err => {
          console.log(err);
          setError('Invalid credintials');
        });
    }
  };
  return (
    <ImageBackground
      source={require('../assets/Bg.jpg')}
      resizeMode="cover"
      blurRadius={10}
      imageStyle={{opacity: 0.5}}>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: 'black',
            opacity: 0.5,
            marginBottom: 20,
          }}>
          Login
        </Text>
        <View
          style={{
            marginTop: 50,
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
              Email Address
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
              placeholder="Your email address"
              onChangeText={value => {
                handleChange({target: {name: 'email', value}});
                setError('');
              }}
            />

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
              onChangeText={value => {
                handleChange({target: {name: 'password', value}});
                setError('');
              }}
            />
          </View>
          <Text
            style={{
              width: 246,
              color: 'black',
              opacity: 0.6,
              fontSize: 15,
              fontWeight: 'bold',
              marginTop: 10,
            }}>
            Forgot Password?
          </Text>
          {error ? <Text style={{color: 'red'}}>{error}</Text> : null}
          <Pressable style={styles.buttons} onPress={handleLogin}>
            <Text
              style={{
                color: 'white',
                fontSize: 17,
                fontWeight: 'bold',
              }}>
              Sign In
            </Text>
          </Pressable>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: StyleSheet.hairlineWidth,
              width: 246,
              marginTop: 20,
              marginBottom: 10,
              borderWidth: 0.5,
            }}
          />
          <Text
            style={{
              width: 246,
              color: 'black',
              opacity: 0.6,
              fontSize: 15,
              fontWeight: 'bold',
            }}>
            New User?
          </Text>
          <Pressable
            style={styles.buttons}
            onPress={() => navigation.navigate('Register')}>
            <Text
              style={{
                color: 'white',
                fontSize: 17,
                fontWeight: 'bold',
              }}>
              Sign Up
            </Text>
          </Pressable>
        </View>
      </View>
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

export default Login;
