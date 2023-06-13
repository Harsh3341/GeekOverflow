import {
  Image,
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
        collectionId: Config.APPWRITE_COLLECTION_ID,
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
    <View style={styles.container}>
      {user && (
        <View>
          <Text>Name:{user.name}</Text>
          <Text>Email:{user.email}</Text>
        </View>
      )}

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
