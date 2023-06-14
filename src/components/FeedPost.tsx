import {View, Text, Pressable} from 'react-native';
import React from 'react';

type FeedPostProps = {
  question: any;
  navigation: any;
};

const FeedPost = ({question, navigation}: FeedPostProps) => {
  const tags = question.tags.trim().split(' ');

  const updatedTime = new Date(question.$updatedAt);
  const currentTime = new Date();
  const timeDifference = currentTime.getTime() - updatedTime.getTime();
  const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutesDifference = Math.floor(timeDifference / (1000 * 60));

  let updatedAt = '';
  if (hoursDifference > 0) {
    updatedAt = `${hoursDifference} hours ago`;
  } else {
    updatedAt = `${minutesDifference} minutes ago`;
  }

  return (
    <Pressable
      style={{
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      }}
      onPress={() => navigation.navigate('Post', {question})}>
      <Text
        style={{
          fontSize: 15,
          fontWeight: 'bold',
          color: '#000000',
          opacity: 0.7,
        }}>
        {question.title}
      </Text>
      <View
        style={{
          width: '100%',
          alignItems: 'flex-start',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 10,
        }}>
        {tags.map((tag: string) => (
          <Text
            style={{
              fontSize: 12,
              color: '#ffffff',
              marginTop: 20,
              backgroundColor: '#484848',
              padding: 5,
              borderRadius: 5,
            }}
            key={tag}>
            {tag}
          </Text>
        ))}
      </View>
      <View
        style={{
          width: '100%',
          alignItems: 'flex-end',
        }}>
        <Text
          style={{
            fontSize: 12,
            color: '#000000',
            marginTop: 20,
            padding: 5,
            borderRadius: 5,
          }}>
          {question.username}
          {'  '}
          {updatedAt}
        </Text>
      </View>
    </Pressable>
  );
};

export default FeedPost;
