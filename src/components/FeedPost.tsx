import {View, Text} from 'react-native';
import React from 'react';

type FeedPostProps = {
  title: string;
};

const FeedPost = ({title}: FeedPostProps) => {
  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        marginTop: 20,
        height: 100,
      }}>
      <Text>{title}</Text>
    </View>
  );
};

export default FeedPost;
