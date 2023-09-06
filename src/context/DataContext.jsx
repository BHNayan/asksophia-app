import { createContext, useState, useContext, useReducer} from "react";
import useTags from "../hooks/useTags";
import { tagsReducer, initialState } from "../Reducers/tagsReducer";


const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [tagState, dispatchTag]= useReducer(tagsReducer, initialState);
  const {tags}=tagState;
  useTags(dispatchTag);

  return (
    <DataContext.Provider value={{ tags }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
