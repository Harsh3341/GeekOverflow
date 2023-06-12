import {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {AppwriteContext} from '../appwrite/AppwriteContext';
import Loading from '../components/Loading';

// Routes
import {AuthStack} from './AuthStack';
import {AppStack} from './AppStack';

export const Router = () => {
  const [isloading, setIsLoading] = useState<boolean>(true);
  const {appwrite, isLoggedIn, setIsLoggedIn, setUser} =
    useContext(AppwriteContext);

  useEffect(() => {
    appwrite
      .getCurrentUser()
      .then(response => {
        setIsLoading(false);

        if (response) {
          setIsLoggedIn(true);
          setUser(response);
        }
      })
      .catch(error => {
        setIsLoading(false);
        setIsLoggedIn(false);
      });
  }, [appwrite, setIsLoggedIn, setUser]);

  if (isloading) {
    return <Loading />;
  }
  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
