import {createContext} from "react";

type userType = {
  userID: number;
  setUserID: React.Dispatch<React.SetStateAction<number>>;
};

export const Context = createContext({userID: 42} as userType);
