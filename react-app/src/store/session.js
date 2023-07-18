import { logger, customFetch } from '../utils/helpers';

//! ===== ACTIONS ======
const GET_USER = 'sessoin/GET_USER';
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

//! ===== ACTION CREATORS ======
const getUser = user => {
  return {
    type: GET_USER,
    payload: user,
  };
};

const setUser = user => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const initialState = { user: null };

//! ===== THUNKS ======
export const authenticate = () => async dispatch => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
};

export const thunkGetUser = userId => async dispatch => {
  try {
    const resData = await customFetch(`/api/users/${userId}`);

    if (resData.errors) {
      const error = resData;
      return error;
    }

    const user = resData;
    dispatch(getUser(user));
    return user;
  } catch (error) {
    return error;
  }
};

export const login = (email, password) => async dispatch => {
  try {
    const resData = await customFetch('/api/auth/login', 'POST', {
      email,
      password,
    });

    if (resData.errors) {
      const error = resData;
      return error;
    }

    const user = resData;
    dispatch(setUser(user));
    return user;
  } catch (error) {
    return error;
  }
};

export const logout = () => async dispatch => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};

export const signUp = (username, email, password) => async dispatch => {
  try {
    const resData = await customFetch('/api/auth/signup', 'POST', {
      username,
      email,
      password,
    });

    if (resData.errors) {
      const error = resData;
      return error;
    }

    const user = resData;
    dispatch(setUser(user));
    return user;
  } catch (error) {
    return error;
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    case GET_USER:
      return { user: action.payload };
    case REMOVE_USER:
      return { user: null };
    default:
      return state;
  }
}
