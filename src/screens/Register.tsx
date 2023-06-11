import {
  Image,
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

type RegiterScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'Register'
>;

const Register = ({navigation}: RegiterScreenProps): JSX.Element => {
  const {appwrite, setIsLoggedIn} = useContext(AppwriteContext);

  const [error, setError] = useState<string>('');

  const [credintials, setCredintials] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleRegister = () => {
    if (
      credintials.name.length < 1 ||
      credintials.email.length < 1 ||
      credintials.password.length < 1 ||
      credintials.confirmPassword.length < 1
    ) {
      setError('Please fill all the fields');
    } else if (credintials.password !== credintials.confirmPassword) {
      setError('Passwords do not match');
    } else {
      const user = {
        name: credintials.name,
        email: credintials.email,
        password: credintials.password,
      };
      appwrite
        .createAccount(user)
        .then((res: any) => {
          if (res) {
            setIsLoggedIn(true);
            Snackbar.show({
              text: 'Registered successfully',
              duration: Snackbar.LENGTH_SHORT,
            });
          }
        })
        .catch(err => {
          console.log(err);
          setError(err.message);
        });
    }
  };

  const handleChange = (e: {target: {name: any; value: any}}) => {
    setCredintials({...credintials, [e.target.name]: e.target.value});
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require('../assets/Heading(Logo).png')}
          style={{
            width: 272,
            height: 154,
          }}
        />
        <View
          style={{
            marginTop: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              gap: 10,
            }}>
            <TextInput
              style={{
                height: 40,
                borderColor: '#BCBBBB',
                borderLeftWidth: 5,
                borderRightWidth: 5,
                borderBottomWidth: 5,
                width: 246,
                padding: 10,
              }}
              placeholder="Name"
              onChangeText={value => {
                handleChange({target: {name: 'name', value}});
                setError('');
              }}
            />
            <TextInput
              style={{
                height: 40,
                borderColor: '#BCBBBB',
                borderLeftWidth: 5,
                borderRightWidth: 5,
                borderBottomWidth: 5,
                width: 246,
                padding: 10,
              }}
              placeholder="Email"
              onChangeText={value => {
                handleChange({target: {name: 'email', value}});
                setError('');
              }}
            />
            <TextInput
              style={{
                height: 40,
                borderColor: '#BCBBBB',
                borderLeftWidth: 5,
                borderRightWidth: 5,
                borderBottomWidth: 5,
                width: 246,
                padding: 10,
              }}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={value => {
                handleChange({target: {name: 'password', value}});
                setError('');
              }}
            />
            <TextInput
              style={{
                height: 40,
                borderColor: '#BCBBBB',
                borderLeftWidth: 5,
                borderRightWidth: 5,
                borderBottomWidth: 5,
                width: 246,
                padding: 10,
              }}
              placeholder="Confirm Password"
              secureTextEntry={true}
              onChangeText={value => {
                handleChange({target: {name: 'confirmPassword', value}});
                setError('');
              }}
            />
          </View>
          {error ? <Text style={{color: 'red'}}>{error}</Text> : null}
          <Pressable style={styles.buttons} onPress={handleRegister}>
            <Text
              style={{
                color: 'white',
                fontSize: 17,
                fontWeight: 'bold',
              }}>
              Sign Up
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
            Already A User?
          </Text>
          <Pressable
            style={styles.buttons}
            onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                color: 'white',
                fontSize: 17,
                fontWeight: 'bold',
              }}>
              Sign In
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3C7',
    height: '100%',
    width: '100%',
    paddingHorizontal: 43,
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
    marginTop: 35,
  },
});

export default Register;
