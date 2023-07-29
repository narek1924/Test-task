import { createSlice, configureStore } from "@reduxjs/toolkit";

const filesSlice = createSlice({
  name: "filesState",
  initialState: {
    files: [],
  },
  reducers: {
    addFile: (state, action) => {
      state.files = [action.payload, ...state.files];
    },
    deleteFile: (state, action) => {
      state.files = state.files.filter((file) => file.id !== action.payload);
    },
    onUploadFinished: (state, action) => {
      const index = state.files.findIndex((file) => file.id === action.payload);
      state.files[index].loading = false;
    },
    onError: (state, action) => {
      console.log(action.payload);
      const index = state.files.findIndex(
        (file) => file.id === action.payload.id
      );
      state.files[index].loading = false;
      if (action.payload.error === 409) {
        state.files[index].errorMessage =
          "File with such a name already exists";
      } else {
        state.files[index].errorMessage = "Upload failed";
      }
    },
  },
});

export const fileActions = filesSlice.actions;

const store = configureStore({
  reducer: filesSlice.reducer,
});
export default store;
