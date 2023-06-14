import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const Landing = ({navigation}: any): JSX.Element => {
  return (
    <ImageBackground
      source={require('../assets/Bg.jpg')}
      style={styles.container}
      resizeMode="cover"
      blurRadius={10}
      imageStyle={{opacity: 0.5}}>
      <Pressable
        style={styles.container}
        onPress={() => navigation.navigate('Login')}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../assets/Logo.png')}
            style={{
              width: 200,
              height: 200,
            }}
          />
        </View>
      </Pressable>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
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

export default Landing;
