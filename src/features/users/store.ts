import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { GetUsersRequest, GetUsersResponse, User } from "./types";
import { api } from "./api";
import { RootState } from "../../app/store";

interface State {
  searchValue: string;
  isLoading: boolean;
  loadError: string | null;
  list: User[];
  selectedUserId: number;
}

const initialState: State = {
  searchValue: "",
  isLoading: false,
  loadError: null,
  list: [],
  selectedUserId: 0,
};

export const getUserList = createAsyncThunk<
  GetUsersResponse,
  void | State["searchValue"],
  { state: RootState }
>("users/getUserList", async (_, thunkApi) => {
  const { rejectWithValue, fulfillWithValue, getState } = thunkApi;
  try {
    const searchValue = getState().user.searchValue;

    const split = searchValue.split(",").map((item) => item.trim());
    const queryItems: GetUsersRequest = [];
    split.forEach((item) => {
      const num = Number(item);
      if (num) queryItems.push(num);
      else if (item) queryItems.push(item);
    });
    if (!queryItems.length) return fulfillWithValue([]);

    const response = await api.getUsers(queryItems);
    return fulfillWithValue(response.data);
  } catch (e) {
    return rejectWithValue(e);
  }
});

export const userSlice = createSlice({
  name: "users",
  initialState,

  reducers: {
    setSearchValue(
      state,
      action: PayloadAction<State["searchValue"] | null | undefined>
    ) {
      state.searchValue = action.payload || initialState.searchValue;
      state.isLoading = true;
    },
    selectUser(
      state,
      action: PayloadAction<State["selectedUserId"] | null | undefined>
    ) {
      state.selectedUserId = action.payload || initialState.selectedUserId;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getUserList.pending, (state) => {
      state.isLoading = true;
      state.loadError = null;
    });
    builder.addCase(getUserList.rejected, (state, action) => {
      state.isLoading = false;
      let error: State["loadError"] = "Unknown error";
      if (
        action.payload instanceof AxiosError &&
        action.payload.isAxiosError &&
        action.payload.response?.data
      )
        error = action.payload.response?.data;
      else if (action.payload instanceof Error) error = action.payload.message;

      state.loadError = error;
    });
    builder.addCase(getUserList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.loadError = null;
      state.list = action.payload;
      state.selectedUserId = initialState.selectedUserId;
    });
  },
});

export const { setSearchValue, selectUser } = userSlice.actions;

export default userSlice.reducer;
