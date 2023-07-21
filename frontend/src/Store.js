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

    // Add action type to update the form data
    // case 'UPDATE_FORM_DATA':
    //   const updatedFormData = { ...state.SavedData, ...action.payload };
    //   // Save the updated form data to local storage
    //   localStorage.setItem('SavedData', JSON.stringify(updatedFormData));
    //   return { ...state, SavedData: updatedFormData };

    // case 'CLEAR_FORM_DATA':
    //   return { ...state, formData: null };

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}

// SavedData: {
//   surveyId: '',
//   projectcode: '',
//   block: '',
//   structure: '',
//   A: '',
//   B: '',
//   C: '',
//   D: '',
//   E: '',
//   F: '',
//   G: '',
//   H: '',
//   I: '',
//   J: '',
//   ImageA: '',
//   ImageB: '',
//   ImageC: '',
//   ImageD: '',
//   ImageE: '',
//   ImageF: '',
//   ImageG: '',
//   ImageH: '',
//   ImageI: '',
//   ImageJ: '',

//   htablex: '',
//   htabley: '',
//   img: '',
//   images: '',
//   // Add other form data fields here...
// },
