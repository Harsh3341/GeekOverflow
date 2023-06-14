import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {useContext, useEffect, useState} from 'react';

import {AppwriteContext} from '../appwrite/AppwriteContext';
import {Config} from '../utils/config';
import {Query} from 'appwrite';
import UserPost from '../components/UserPost';

const Profile = ({navigation}: any): JSX.Element => {
  const {appwrite, setIsLoggedIn, user, setUser, stale, setStale} =
    useContext(AppwriteContext);

  const [questions, setQuestions] = useState<any[]>([]);
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

  useEffect(() => {
    try {
      const data = {
        databaseId: Config.APPWRITE_DATABASE_ID,
        collectionId: Config.APPWRITE_QUESTIONS_COLLECTION_ID,
        queries: [
          Query.equal('userId', user.$id),
          Query.orderDesc('$createdAt'),
        ],
      };

      appwrite.listDocuments(data).then((res: any) => {
        if (res.documents) {
          setQuestions(res.documents);

          setStale(false);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }, [stale]);

  return (
    <ImageBackground
      source={require('../assets/Bg.jpg')}
      resizeMode="cover"
      blurRadius={18}
      imageStyle={{opacity: 0.4}}>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: 'black',
            opacity: 0.5,
            marginBottom: 20,
          }}>
          Profile
        </Text>
        {user && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <Image
              source={require('../assets/art.png')}
              style={{height: 50, width: 50, borderRadius: 25}}
            />
            <View style={{marginLeft: 20}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                {user.name}
              </Text>
              <Text style={{fontSize: 16}}>{user.email}</Text>

              <Text style={{fontSize: 16}}>{questions.length} questions</Text>
            </View>

            <Pressable
              style={{
                backgroundColor: 'black',
                borderRadius: 23,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 'auto',
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
              onPress={() => navigation.navigate('Create')}>
              <Text style={{color: 'white'}}>edit profile</Text>
            </Pressable>
          </View>
        )}
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
            opacity: 0.5,
            marginTop: 20,
          }}>
          Your Questions
        </Text>
        <ScrollView
          style={{
            marginVertical: 20,
          }}
          showsVerticalScrollIndicator={false}>
          {questions.map((question: any) => (
            <UserPost
              key={question.$id}
              question={question}
              navigation={navigation}
            />
          ))}
        </ScrollView>
        <Pressable style={styles.buttons} onPress={handleLogout}>
          <Text style={{color: 'white'}}>Logout</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 20,
    justifyContent: 'center',
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
