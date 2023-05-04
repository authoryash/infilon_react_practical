import Axios from '../utils/axios';
import {
  FETCH_USER_DETAILS_ERROR,
  LOADING_STARTS,
  FETCH_USER_DETAILS_SUCCESS,
  LOADING_ENDS,
} from './actiontypes';

export const fetchUserList = (pageNumber) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADING_STARTS });
      const response = await Axios.get(`/users?page=${pageNumber}`);
      dispatch({
        type: FETCH_USER_DETAILS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_USER_DETAILS_ERROR,
        payload: error.message,
      });
    } finally {
      dispatch({ type: LOADING_ENDS });
    }
  };
};
