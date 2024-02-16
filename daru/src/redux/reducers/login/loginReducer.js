import { createSlice } from '@reduxjs/toolkit';

const loginReducer = createSlice({
  name: 'loginReducer',
  initialState: {
    loginedId: null
  },
  reducers: {
    setLoginedId: (state, { payload: loginedId }) => {
      return {
        ...state,
        loginedId: loginedId
      };
    },
    removeLoginedId: (state) => {
      return {
        ...state,
        loginedId: null
      }
    }
  }
});

export const { setLoginedId, removeLoginedId } = loginReducer.actions;
export default loginReducer.reducer;