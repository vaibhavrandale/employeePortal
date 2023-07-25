import { createContext, useReducer } from 'react';

export const Store = createContext();
const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  // SavedData: localStorage.getItem('SavedData')
  //   ? JSON.parse(localStorage.getItem('SavedData'))
  //   : {},
};

function reducer(state, action) {
  switch (action.type) {
    case 'EMP_SIGNIN':
      return { ...state, userInfo: action.payload };

    case 'EMP_SIGNOUT':
      return { ...state, userInfo: null };

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
