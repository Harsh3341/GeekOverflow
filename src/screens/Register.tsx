import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const Register = ({navigation}: any): JSX.Element => {
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
            />
          </View>

          <TouchableOpacity style={styles.buttons}>
            <Text
              style={{
                color: 'white',
                fontSize: 17,
                fontWeight: 'bold',
              }}>
              Sign Up
            </Text>
          </TouchableOpacity>
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
          <TouchableOpacity
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
          </TouchableOpacity>
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
