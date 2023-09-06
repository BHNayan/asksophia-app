import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import { categoryReducer, initialState } from "../Reducers/categoryReducer";
import { fetchAllCategories } from "../api/categoryService";

export const useFilteredTools = (category, setIsLoading) => {
  const [list, setList] = useState([]);
  const [catState, dispatch] = useReducer(categoryReducer, initialState);

  const getCategories = async () => {
      setIsLoading(true);
      const response = await fetchAllCategories(dispatch, 0);
      setList(response);
      setIsLoading(false);
  }

  const getToolsByCategory = async (category) => {
    try {
      console.log(category)
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}tools/category/` + category);
      setList(response.data);
    } catch (error) {
      console.error('There was an error!', error);
    }
  }


  useEffect(() => {
    if (category) {
      getToolsByCategory(category);
    } else {
      getCategories();
    }
  }, [category]);

  return list;
};