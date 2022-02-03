import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { get } from 'services/api';

interface IUser {
    id: number;
    name: string;
    username: string;
    email: string;
}

export interface UserState {
  value: IUser[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
  value: [],
  status: 'idle'
};

export const getUsers = createAsyncThunk(
  'user/fetchUsers',
  async () => {
    const response = await get('/karolkproexe/jsonplaceholderdb/data');
    console.log(response);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<IUser>) => {
      state.value = [...state.value, action.payload];
    },
    remove: (state, action: PayloadAction<IUser>) => {
      state.value = state.value.filter(user => user.id !== action.payload.id);
    },
    edit: (state, action: PayloadAction<IUser>) => {
      state.value = state.value.map(user => {
        if (user.id === action.payload.id) return action.payload;

        return user;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload.data;
      });
  },
});

export const { add, edit, remove } = userSlice.actions;

export const selectStatus = (state: RootState) => state.counter.status;

export default userSlice.reducer;
