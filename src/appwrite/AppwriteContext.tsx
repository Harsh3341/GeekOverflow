import {FC, PropsWithChildren, createContext, useState} from 'react';

import Appwrite from './service';

type AppContextType = {
  appwrite: Appwrite;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  user: any;
  setUser: (user: any) => void;
  stale: boolean;
  setStale: (stale: boolean) => void;
};

export const AppwriteContext = createContext<AppContextType>({
  appwrite: new Appwrite(),
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: null,
  setUser: () => {},
  stale: false,
  setStale: () => {},
});

export const AppwriteProvider: FC<PropsWithChildren> = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [stale, setStale] = useState(false);
  const defaultValue = {
    appwrite: new Appwrite(),
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    stale,
    setStale,
  };
  return (
    <AppwriteContext.Provider value={defaultValue}>
      {children}
    </AppwriteContext.Provider>
  );
};

export default AppwriteContext;
