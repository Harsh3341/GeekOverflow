import {View, Text, TextInput, ScrollView} from 'react-native';
import {useState, useContext, useEffect} from 'react';
import {Pressable} from 'react-native';
import {AppwriteContext} from '../appwrite/AppwriteContext';
import Snackbar from 'react-native-snackbar';
import {Config} from '../utils/config';
import {UpdateDocument} from '../appwrite/service';
import Loading from './Loading';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../routes/AppStack';

type EditPostProps = NativeStackScreenProps<AppStackParamList, 'Edit'>;

const EditPost = ({navigation, route}: EditPostProps) => {
  const {appwrite, user, setStale} = useContext(AppwriteContext);
  const [isloading, setIsLoading] = useState<boolean>(false);

  const {question} = route.params;

  const [title, setTitle] = useState<string>(question.title);
  const [details, setDetails] = useState<string>(question.details);
  const [tryDetails, setTryDetails] = useState<string>(question.tryDetails);
  const [tags, setTags] = useState<string>(question.tags);
  const [error, setError] = useState<string>('');

  const handleUpdate = () => {
    if (
      title.length < 1 ||
      details.length < 1 ||
      tags.length < 1 ||
      tryDetails.length < 1
    ) {
      setError('Please fill all the fields');
    } else {
      setIsLoading(true);
      const updatedQuestion = {
        title: title,
        details: details,
        tags: tags,
        tryDetails: tryDetails,
        userId: user.$id,
      };
      const data: UpdateDocument = {
        databaseId: Config.APPWRITE_DATABASE_ID,
        collectionId: Config.APPWRITE_COLLECTION_ID,
        data: updatedQuestion,
        documentId: question.$id,
      };

      appwrite
        .updateDocument(data)
        .then((res: any) => {
          if (res) {
            Snackbar.show({
              text: 'Question updated successfully',
              duration: Snackbar.LENGTH_SHORT,
            });
            setTitle('');
            setDetails('');
            setTags('');
            setTryDetails('');
            setError('');
            setIsLoading(false);
            setStale(true);
            navigation.navigate('Navbar');
          }
        })
        .catch(err => {
          console.log(err);
          setIsLoading(false);
          setError('Something went wrong');
        });
    }
  };

  const handleDelete = () => {
    setIsLoading(true);
    const data = {
      databaseId: Config.APPWRITE_DATABASE_ID,
      collectionId: Config.APPWRITE_COLLECTION_ID,
      documentId: question.$id,
    };
    appwrite
      .deleteDocument(data)
      .then((res: any) => {
        if (res) {
          Snackbar.show({
            text: 'Question deleted successfully',
            duration: Snackbar.LENGTH_SHORT,
          });
          setIsLoading(false);
          setStale(true);
          navigation.navigate('Navbar');
        }
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
        setError('Something went wrong');
      });
  };

  useEffect(() => {
    if (error) {
      Snackbar.show({
        text: error,
        duration: Snackbar.LENGTH_SHORT,
      });
      setError('');
    }
  }, [error, isloading, route.params?.question]);

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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#ffffff',
            }}>
            Edit
          </Text>
          <Pressable
            style={{
              marginTop: 20,
              backgroundColor: '#000000',
              padding: 5,
              borderRadius: 5,
            }}
            onPress={handleDelete}>
            <Text
              style={{
                color: '#ffffff',
              }}>
              Delete
            </Text>
          </Pressable>
        </View>
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
              onPress={handleUpdate}>
              <Text
                style={{
                  color: '#ffffff',
                }}>
                Update
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default EditPost;
