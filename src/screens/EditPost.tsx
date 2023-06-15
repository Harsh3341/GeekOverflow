import {View, Text, TextInput, ScrollView, ImageBackground} from 'react-native';
import {useState, useContext, useEffect} from 'react';
import {Pressable} from 'react-native';
import {AppwriteContext} from '../appwrite/AppwriteContext';
import Snackbar from 'react-native-snackbar';
import {Config} from '../utils/config';
import {UpdateDocument} from '../appwrite/service';
import Loading from '../components/Loading';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../routes/AppStack';
import {Query} from 'appwrite';

type EditPostProps = NativeStackScreenProps<AppStackParamList, 'EditPost'>;

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
        collectionId: Config.APPWRITE_QUESTIONS_COLLECTION_ID,
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
      collectionId: Config.APPWRITE_COMMENTS_COLLECTION_ID,
      queries: [Query.equal('questionId', question.$id)],
    };

    appwrite.listDocuments(data).then((res: any) => {
      if (res) {
        res.documents.forEach((comment: any) => {
          const data = {
            databaseId: Config.APPWRITE_DATABASE_ID,
            collectionId: Config.APPWRITE_COMMENTS_COLLECTION_ID,
            documentId: comment.$id,
          };
          appwrite
            .deleteDocument(data)
            .then((res: any) => {})
            .catch(err => {
              console.log(err);
              setIsLoading(false);
              setError('Something went wrong');
            });
        });
      }
    });
    const data2 = {
      databaseId: Config.APPWRITE_DATABASE_ID,
      collectionId: Config.APPWRITE_QUESTIONS_COLLECTION_ID,
      documentId: question.$id,
    };
    appwrite
      .deleteDocument(data2)
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
    <ImageBackground
      source={require('../assets/Bg.jpg')}
      resizeMode="cover"
      blurRadius={18}
      imageStyle={{opacity: 0.4}}>
      <View
        style={{
          padding: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              color: 'black',
              opacity: 0.5,
            }}>
            Edit
          </Text>
          <Pressable
            style={{
              backgroundColor: '#000000',
              padding: 5,
              borderRadius: 5,
              width: '20%',
              alignItems: 'center',
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
            marginBottom: 150,
          }}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              backgroundColor: '#ffffff',
              padding: 20,
              borderRadius: 10,
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: 'black',
                opacity: 0.7,
              }}>
              Title
            </Text>
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
              placeholder='Eg: "How to use React Native"'
            />
          </View>
          <View
            style={{
              backgroundColor: '#ffffff',
              padding: 20,
              borderRadius: 10,
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: 'black',
                opacity: 0.7,
              }}>
              What are the details of your problem
            </Text>
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
              placeholder='Eg: "I am trying to use React Native but I am getting an error"'
            />
          </View>
          <View
            style={{
              backgroundColor: '#ffffff',
              padding: 20,
              borderRadius: 10,
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: 'black',
                opacity: 0.7,
              }}>
              What did you try and what were you expecting
            </Text>
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
              placeholder='Eg: "I tried to use React Native but I am getting an error"'
            />
          </View>
          <View
            style={{
              backgroundColor: '#ffffff',
              padding: 20,
              borderRadius: 10,
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: 'black',
                opacity: 0.7,
              }}>
              Tags
            </Text>
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
              placeholder='Eg: "React-Native Hashnode Appwrite"'
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
    </ImageBackground>
  );
};

export default EditPost;
