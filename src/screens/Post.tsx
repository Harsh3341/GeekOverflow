import {
  View,
  Text,
  ScrollView,
  Pressable,
  ImageBackground,
  Image,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../routes/AppStack';
import {Divider} from 'react-native-paper';
import Comment from '../components/Comment';
import {AppwriteContext} from '../appwrite/AppwriteContext';
import {Config} from '../utils/config';
import {Permission, Query, Role} from 'appwrite';
import {appwriteClient} from '../appwrite/service';

type PostProps = NativeStackScreenProps<AppStackParamList, 'Post'>;

export type Comments = {
  name: string;
  comment: string;
  userId: string;
};

const Post = ({navigation, route}: PostProps) => {
  const {question, profile}: any = route.params;
  const tags = question.tags.trim().split(' ');
  const createdAt = new Date(question.$createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

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
        <ScrollView
          style={{
            marginBottom: 20,
          }}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              padding: 20,
              height: '100%',
              width: '100%',
            }}>
            {profile ? (
              <View
                style={{
                  width: '100%',
                  alignItems: 'flex-end',
                }}>
                <Pressable
                  style={{
                    backgroundColor: '#000000',
                    padding: 5,
                    borderRadius: 5,
                    width: '20%',
                    alignItems: 'center',
                  }}
                  onPress={() => navigation.navigate('EditPost', {question})}>
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
                color: '#000000',
                fontWeight: 'bold',
                textAlign: 'left',
                width: '100%',
              }}>
              {question.title}
            </Text>
            <Divider style={{width: '100%', marginVertical: 20}} />
            <View
              style={{
                width: '100%',
                alignItems: 'flex-start',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: '#000000',
                  textAlign: 'left',
                  width: '100%',
                }}>
                {question.details}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: '#000000',
                  marginTop: 5,
                  textAlign: 'left',
                  width: '100%',
                }}>
                {question.tryDetails}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                alignItems: 'flex-end',
                gap: 10,
                flexDirection: 'row',
              }}>
              {tags.map((tag: any, index: any) => (
                <Text
                  style={{
                    fontSize: 12,
                    color: '#ffffff',
                    marginTop: 20,
                    backgroundColor: '#484848',
                    padding: 5,
                    borderRadius: 5,
                  }}
                  key={index}>
                  {tag}
                </Text>
              ))}
            </View>
            <View
              style={{
                width: '100%',
                alignItems: 'flex-end',
                gap: 10,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <View
                style={{
                  gap: 10,
                  marginTop: 20,
                  backgroundColor: '#cfd1d5',
                  padding: 5,
                  borderRadius: 5,
                  width: '50%',
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#000000',
                  }}>
                  {createdAt}
                  {' at '}
                  {new Date(question.$createdAt).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                  }}>
                  <Image
                    source={require('../assets/art.png')}
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#000000',
                    }}>
                    {question.username}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                marginBottom: 20,
              }}>
              <Comment setComment={setComment} />
            </View>

            {comments.length > 0
              ? comments.map((comment, index) => (
                  <View
                    key={index}
                    style={{
                      width: '100%',
                    }}>
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        gap: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: '#000000',
                          textAlign: 'left',
                        }}>
                        {comment.comment}
                      </Text>

                      <Text
                        style={{
                          fontSize: 12,
                          color: '#000000',
                          textAlign: 'left',
                          marginTop: 5,
                        }}>
                        ~{comment.name}
                      </Text>
                    </View>
                    <Divider style={{width: '100%', marginVertical: 10}} />
                  </View>
                ))
              : null}
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default Post;
