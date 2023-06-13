import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {Divider} from 'react-native-paper';

type userPostProps = {
  question: any;
  navigation: any;
};

const UserPost = ({question, navigation}: userPostProps): JSX.Element => {
  return (
    <>
      <Pressable
        key={question.$id}
        style={{
          backgroundColor: '#ffffff',
          padding: 20,
        }}
        onPress={() => navigation.navigate('Post', {question, profile: true})}>
        <Text>{question.title}</Text>
      </Pressable>
      <Divider />
    </>
  );
};

export default UserPost;
