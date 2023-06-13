import {View, Text, ScrollView, Pressable} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../routes/AppStack';
import {Divider} from 'react-native-paper';

type PostProps = NativeStackScreenProps<AppStackParamList, 'Post'>;

const Post = ({navigation, route}: PostProps) => {
  const {question, profile}: any = route.params;

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
      </View>
    </ScrollView>
  );
};

export default Post;
