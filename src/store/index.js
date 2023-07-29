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
      switch (action.payload.error) {
        case "ERR_NETWORK": {
          state.files[index].errorMessage = "Network Error";
          return;
        }
        case 409: {
          state.files[index].errorMessage =
            "File with such a name already exists";
          return;
        }
        case "File type is not supported": {
          state.files[index].errorMessage = "File type is not supported";
          return;
        }
        default: {
          state.files[index].errorMessage = "Upload failed";
        }
      }
    },
  },
});

export const fileActions = filesSlice.actions;

const store = configureStore({
  reducer: filesSlice.reducer,
});
export default store;
