import { useEffect, useState, useReducer } from "react";
import { descriptionReducer, initialState } from "../Reducers/descriptionReducer";
import { fetchAllTools } from "../api/descriptionService";

export const useToolsDesc = () => {
  const [list, setList] = useState([]);
  const [toolState, dispatch] = useReducer(descriptionReducer, initialState);

  const getTools = async () => {
      const response = await fetchAllTools(dispatch, 0);
      setList(response);
  }

  useEffect(() => {
      getTools();
  }, []);

  return list;
};