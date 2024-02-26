import {createContext, useContext, ReactElement} from 'react';
import {InternalUser} from './App';

type LoggedInUserContext = {
  user: InternalUser;
  setUserInfo: React.Dispatch<React.SetStateAction<InternalUser | undefined>>;
};

export const LoggedInUserContext = createContext({} as LoggedInUserContext);
export const useLoggedInUserContext = () => useContext(LoggedInUserContext);
