import {View, Text, ScrollView} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import FeedPost from '../components/FeedPost';
import {AppwriteContext} from '../appwrite/AppwriteContext';
import {Config} from '../utils/config';

type Question = {
  $id: string;
  title: string;
};

const Feed = () => {
  const {appwrite, stale, setStale} = useContext(AppwriteContext);

  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    try {
      const data = {
        databaseId: Config.APPWRITE_DATABASE_ID,
        collectionId: Config.APPWRITE_COLLECTION_ID,
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
          {questions.map((question: Question) => (
            <FeedPost key={question.$id} title={question.title} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Feed;
