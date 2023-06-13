import {View, Text, ScrollView, Pressable} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../routes/AppStack';
import {Divider} from 'react-native-paper';
import Comment from './Comment';
import {AppwriteContext} from '../appwrite/AppwriteContext';
import {Config} from '../utils/config';
import {Permission, Query, Role} from 'appwrite';
import {Subscribe} from '../appwrite/service';

type PostProps = NativeStackScreenProps<AppStackParamList, 'Post'>;

export type Comments = {
  name: string;
  comment: string;
  userId: string;
};

const Post = ({navigation, route}: PostProps) => {
  const {question, profile}: any = route.params;

  const {appwrite} = useContext(AppwriteContext);

  const [comments, setComments] = useState<Comments[]>([]);

  const setComment = (comment: Comments) => {
    const data = {
      databaseId: Config.APPWRITE_DATABASE_ID,
      collectionId: Config.APPWRITE_COMMENTS_COLLECTION_ID,
      data: {
        name: comment.name,
        comment: comment.comment,
        userId: comment.userId,
        questionId: question.$id,
      },
      permissions: [
        Permission.read(Role.any()),
        Permission.write(Role.user(comment.userId)),
        Permission.delete(Role.user(comment.userId)),
        Permission.update(Role.user(comment.userId)),
      ],
    };

    appwrite
      .createDocument(data)
      .then((res: any) => {
        if (res) {
          setComments([...comments, comment]);
        }
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    const data = {
      databaseId: Config.APPWRITE_DATABASE_ID,
      collectionId: Config.APPWRITE_COMMENTS_COLLECTION_ID,
      queries: [Query.equal('questionId', question.$id)],
    };
    appwrite
      .listDocuments(data)
      .then((res: any) => {
        if (res) {
          setComments(res.documents);
        }
      })
      .catch(err => console.log(err));
  }, []);

  // useEffect(() => {
  //   const data: Subscribe = {
  //     channel: ['collections.{collectionId}.documents'],
  //     callback: data => {
  //       if (data.event === 'database.documents.create') {
  //         setComments([...comments, data.payload]);
  //       }
  //     },
  //   };

  //   const unsubscribe = appwrite
  //     .subscribe(data)
  //     .then((res: any) => {
  //       console.log(res);
  //     })
  //     .catch(err => console.log(err));

  //   return () => {
  //     unsubscribe
  //       .then((res: any) => {
  //         console.log(res);
  //       })
  //       .catch(err => console.log(err));
  //   };
  // }, [comments]);

  return (
    <ScrollView
      style={{
        backgroundColor: '#a0a0a0',
      }}
      showsVerticalScrollIndicator={false}>
      <View
        style={{
          backgroundColor: '#ffffff',
          padding: 20,
          marginTop: 20,
          alignItems: 'center',
        }}>
        {profile ? (
          <View
            style={{
              width: '100%',
              alignItems: 'flex-end',
            }}>
            <Pressable
              style={{
                marginTop: 20,
                backgroundColor: '#000000',
                padding: 5,
                borderRadius: 5,
              }}
              onPress={() => navigation.navigate('Edit', {question})}>
              <Text
                style={{
                  color: '#ffffff',
                }}>
                Edit
              </Text>
            </Pressable>
          </View>
        ) : null}
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#000000',
          }}>
          {question.title}
        </Text>
        <Divider style={{width: '100%', marginVertical: 20}} />
        <Text
          style={{
            fontSize: 15,
            color: '#000000',
            marginTop: 20,
            textAlign: 'left',
            width: '100%',
          }}>
          {question.details}
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: '#000000',
            marginTop: 20,
            textAlign: 'left',
            width: '100%',
          }}>
          {question.tryDetails}
        </Text>
        <View
          style={{
            width: '100%',
            alignItems: 'flex-end',
          }}>
          <Text
            style={{
              fontSize: 12,
              color: '#ffffff',
              marginTop: 20,
              backgroundColor: '#000000',
              padding: 5,
              borderRadius: 5,
            }}>
            {question.tags}
          </Text>
        </View>
        {comments.length > 0
          ? comments.map((comment, index) => (
              <View
                key={index}
                style={{
                  width: '100%',
                  alignItems: 'flex-start',
                  marginTop: 20,
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: '#000000',
                    fontWeight: 'bold',
                  }}>
                  {comment.name}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: '#000000',
                  }}>
                  {comment.comment}
                </Text>

                <Divider style={{width: '100%', marginVertical: 20}} />
              </View>
            ))
          : null}
      </View>
      <View>
        <Comment setComment={setComment} />
      </View>
    </ScrollView>
  );
};

export default Post;
