import {View, Text, ScrollView, ImageBackground, Pressable} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import FeedPost from '../components/FeedPost';
import {AppwriteContext} from '../appwrite/AppwriteContext';
import {Config} from '../utils/config';
import {Query} from 'appwrite';

type FeedProps = {
  navigation: any;
  route: any;
};

const Feed = ({navigation, route}: FeedProps) => {
  const {appwrite, stale, setStale} = useContext(AppwriteContext);

  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    try {
      const data = {
        databaseId: Config.APPWRITE_DATABASE_ID,
        collectionId: Config.APPWRITE_QUESTIONS_COLLECTION_ID,
        queries: [Query.orderDesc('$createdAt')],
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
      <View
        style={{
          padding: 20,
          height: '100%',
          width: '100%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              color: 'black',
              opacity: 0.5,
              marginBottom: 20,
            }}>
            Questions
          </Text>
          <Pressable
            style={{
              backgroundColor: '#000000',
              padding: 10,
              borderRadius: 5,
              width: 150,
              alignItems: 'center',
            }}
            onPress={() => navigation.navigate('Create')}>
            <Text
              style={{
                color: '#ffffff',
              }}>
              Ask Question
            </Text>
          </Pressable>
        </View>
        <ScrollView
          style={{
            marginBottom: 20,
          }}
          showsVerticalScrollIndicator={false}>
          {questions.map((question: any) => (
            <FeedPost
              key={question.$id}
              question={question}
              navigation={navigation}
            />
          ))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default Feed;
