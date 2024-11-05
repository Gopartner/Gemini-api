// src/store/slices/chatSlice.js
import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    userName: '', // Tambahkan state untuk menyimpan nama pengguna
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setUserName: (state, action) => { // Tambahkan reducer untuk menyimpan nama
      state.userName = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { addMessage, clearMessages, setUserName } = chatSlice.actions;
export default chatSlice.reducer;

