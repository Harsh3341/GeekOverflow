import {View, Text, TextInput, ScrollView} from 'react-native';
import {useState, useContext, useEffect} from 'react';
import {Pressable} from 'react-native';
import {AppwriteContext} from '../appwrite/AppwriteContext';
import Snackbar from 'react-native-snackbar';
import {Config} from '../utils/config';
import {CreateDocument} from '../appwrite/service';

import {Permission, Role} from 'appwrite';
import Loading from '../components/Loading';

const Create = () => {
  const {appwrite, user, setStale} = useContext(AppwriteContext);
  const [isloading, setIsLoading] = useState<boolean>(false);

  const [title, setTitle] = useState<string>('');
  const [details, setDetails] = useState<string>('');
  const [tryDetails, setTryDetails] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleCreate = () => {
    if (
      title.length < 1 ||
      details.length < 1 ||
      tags.length < 1 ||
      tryDetails.length < 1
    ) {
      setError('Please fill all the fields');
    } else {
      setIsLoading(true);
      const question = {
        title: title,
        details: details,
        tags: tags,
        tryDetails: tryDetails,
        userId: user.$id,
      };
      const data: CreateDocument = {
        databaseId: Config.APPWRITE_DATABASE_ID,
        collectionId: Config.APPWRITE_QUESTIONS_COLLECTION_ID,
        data: question,
        permissions: [
          Permission.read(Role.any()),
          Permission.write(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
        ],
      };

      appwrite
        .createDocument(data)
        .then((res: any) => {
          if (res) {
            Snackbar.show({
              text: 'Question created successfully',
              duration: Snackbar.LENGTH_SHORT,
            });
            setTitle('');
            setDetails('');
            setTags('');
            setTryDetails('');
            setError('');
            setIsLoading(false);
            setStale(true);
          }
        })
        .catch(err => {
          console.log(err);
          setIsLoading(false);
          setError('Something went wrong');
        });
    }
  };

  useEffect(() => {
    if (error) {
      Snackbar.show({
        text: error,
        duration: Snackbar.LENGTH_SHORT,
      });
      setError('');
    }
  }, [error, isloading]);

  if (isloading) {
    return <Loading />;
  }

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
          Ask a Question
        </Text>
        <ScrollView
          style={{
            marginVertical: 20,
          }}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              backgroundColor: '#ffffff',
              padding: 20,
              borderRadius: 10,
              marginTop: 20,
            }}>
            <Text>Title</Text>
            <TextInput
              style={{
                backgroundColor: '#ffffff',
                paddingHorizontal: 10,
                borderRadius: 10,
                marginTop: 20,
                borderColor: 'black',
                borderWidth: 1,
              }}
              onChangeText={text => setTitle(text)}
              value={title}
            />
          </View>
          <View
            style={{
              backgroundColor: '#ffffff',
              padding: 20,
              borderRadius: 10,
              marginTop: 20,
            }}>
            <Text>What are the details of your problem</Text>
            <TextInput
              style={{
                backgroundColor: '#ffffff',
                paddingHorizontal: 10,
                borderRadius: 10,
                marginTop: 20,
                borderColor: 'black',
                borderWidth: 1,
                textAlignVertical: 'top',
                height: 200,
              }}
              onChangeText={text => setDetails(text)}
              value={details}
              multiline={true}
              numberOfLines={10}
            />
          </View>
          <View
            style={{
              backgroundColor: '#ffffff',
              padding: 20,
              borderRadius: 10,
              marginTop: 20,
            }}>
            <Text>What did you try and what were you expecting</Text>
            <TextInput
              style={{
                backgroundColor: '#ffffff',
                paddingHorizontal: 10,
                borderRadius: 10,
                marginTop: 20,
                borderColor: 'black',
                borderWidth: 1,
                textAlignVertical: 'top',
                height: 200,
              }}
              onChangeText={text => setTryDetails(text)}
              value={tryDetails}
              multiline={true}
              numberOfLines={10}
            />
          </View>
          <View
            style={{
              backgroundColor: '#ffffff',
              padding: 20,
              borderRadius: 10,
              marginTop: 20,
            }}>
            <Text>Tags</Text>
            <TextInput
              style={{
                backgroundColor: '#ffffff',
                paddingHorizontal: 10,
                borderRadius: 10,
                marginTop: 20,
                borderColor: 'black',
                borderWidth: 1,
              }}
              onChangeText={text => setTags(text)}
              value={tags}
            />
          </View>
          <View
            style={{
              backgroundColor: '#ffffff',
              padding: 20,
              borderRadius: 10,
              marginTop: 20,
            }}>
            <Pressable
              style={{
                backgroundColor: '#000000',
                padding: 10,
                borderRadius: 10,
                alignItems: 'center',
              }}
              onPress={handleCreate}>
              <Text
                style={{
                  color: '#ffffff',
                }}>
                Post
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Create;
