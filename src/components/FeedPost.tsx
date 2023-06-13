import {View, Text, Pressable} from 'react-native';
import React from 'react';

type FeedPostProps = {
  question: any;
  navigation: any;
};

const FeedPost = ({question, navigation}: FeedPostProps) => {
  return (
    <Pressable
      style={{
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        marginTop: 20,
        height: 100,
      }}
      onPress={() => navigation.navigate('Post', {question})}>
      <Text>{question.title}</Text>
    </Pressable>
  );
};

export default FeedPost;
