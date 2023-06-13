import {View, Text, ScrollView} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import FeedPost from '../components/FeedPost';
import {AppwriteContext} from '../appwrite/AppwriteContext';
import {Config} from '../utils/config';
import {Query} from 'appwrite';

type FeedProps = {
  navigation: any;
};

const Feed = ({navigation}: FeedProps) => {
  const {appwrite, stale, setStale} = useContext(AppwriteContext);

  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    try {
      const data = {
        databaseId: Config.APPWRITE_DATABASE_ID,
        collectionId: Config.APPWRITE_COLLECTION_ID,
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
    <View
      style={{
        flex: 1,
        backgroundColor: '#a0a0a0',
        padding: 20,
      }}>
      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#ffffff',
          }}>
          Questions
        </Text>
        <ScrollView
          style={{
            marginVertical: 20,
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
    </View>
  );
};

export default Feed;
