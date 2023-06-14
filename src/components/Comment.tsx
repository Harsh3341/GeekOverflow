import {View, Text, Pressable, TextInput} from 'react-native';
import React, {useContext, useState} from 'react';
import {AppwriteContext} from '../appwrite/AppwriteContext';
import {Comments} from './Post';

const Comment = ({setComment}: any) => {
  const [toggle, setToggle] = useState(false);
  const [addComment, setAddComment] = useState<string>('');

  const {user} = useContext(AppwriteContext);

  const handleComment = () => {
    const comment: Comments = {
      name: user.name,
      comment: addComment,
      userId: user.$id,
    };

    setComment(comment);
    setToggle(false);
    setAddComment('');
  };

  return (
    <>
      <Text
        style={{
          color: '#000000',
          fontSize: 16,
          fontWeight: 'bold',
          marginTop: 20,
        }}
        onPress={() => setToggle(!toggle)}>
        add comment
      </Text>
      {toggle ? (
        <View
          style={{
            width: '100%',
            alignItems: 'flex-end',
          }}>
          <TextInput
            style={{
              width: '100%',
              height: 100,
              backgroundColor: '#a0a0a0',
              marginTop: 20,
              borderRadius: 5,
              padding: 10,
              verticalAlign: 'top',
            }}
            placeholder="Comment"
            multiline={true}
            numberOfLines={4}
            onChangeText={text => setAddComment(text)}
            value={addComment}
          />
          <Pressable
            style={{
              marginTop: 20,
              backgroundColor: '#000000',
              padding: 5,
              borderRadius: 5,
            }}
            onPress={
              addComment.length > 0 ? handleComment : () => setToggle(false)
            }>
            <Text
              style={{
                color: '#ffffff',
              }}>
              Add Comment
            </Text>
          </Pressable>
        </View>
      ) : null}
    </>
  );
};

export default Comment;
