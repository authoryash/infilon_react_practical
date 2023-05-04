import {
  DELETE_USER_DETAILS,
  EDIT_USER_DETAILS,
  FETCH_USER_DETAILS_ERROR,
  FETCH_USER_DETAILS_SUCCESS,
  LOADING_ENDS,
  LOADING_STARTS,
} from './actiontypes';

const initialState = {
  users: JSON.parse(localStorage.getItem('users')) ?? [],
  totalPages: JSON.parse(localStorage.getItem('totalPages')) ?? 0,
  maxRecordsPerPage: JSON.parse(localStorage.getItem('maxRecordsPerPage')) ?? 0,
  calledPages:
    new Set(JSON.parse(localStorage.getItem('calledPages'))) ?? new Set(),
  loading: false,
  totalRecords: JSON.parse(localStorage.getItem('totalRecords')) ?? 0,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_STARTS: {
      return { ...state, loading: true };
    }
    case LOADING_ENDS: {
      return { ...state, loading: false };
    }
    case FETCH_USER_DETAILS_ERROR: {
      return { ...state, error: action.payload };
    }
    case FETCH_USER_DETAILS_SUCCESS: {
      const { page, per_page, total, total_pages, data } = action.payload;
      const tempSet = new Set(state.calledPages);
      tempSet.add(page);
      const userArray = [...state.users, ...data];
      localStorage.setItem('users', JSON.stringify(userArray));
      localStorage.setItem('totalPages', total_pages);
      localStorage.setItem('maxRecordsPerPage', per_page);
      localStorage.setItem('calledPages', JSON.stringify([...tempSet]));
      localStorage.setItem('totalRecords', total);
      return {
        ...state,
        maxRecordsPerPage: per_page,
        totalRecords: total,
        totalPages: total_pages,
        users: userArray,
        calledPages: tempSet,
      };
    }
    case DELETE_USER_DETAILS: {
      const userArray = state.users.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem('users', JSON.stringify(userArray));
      return {
        ...state,
        users: userArray,
      };
    }
    case EDIT_USER_DETAILS: {
      const userArray = state.users.map((item) =>
        item.id !== action.payload.id ? item : action.payload
      );
      localStorage.setItem('users', JSON.stringify(userArray));
      return {
        ...state,
        users: state.users.map((item) =>
          item.id !== action.payload.id ? item : action.payload
        ),
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
