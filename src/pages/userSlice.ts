import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { IUser } from 'interfaces';
import { get } from 'services/api';

export interface IUserState {
  value: IUser[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: IUserState = {
  value: [],
  status: 'idle'
};

export const getUsers = createAsyncThunk('user/fetchUsers', async () => {
  const response = await get<IUser[]>('/karolkproexe/jsonplaceholderdb/data');
  return response.data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<IUser>) => {
      state.value = [...state.value, action.payload];
    },
    remove: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter(user => user.id !== action.payload);
    },
    edit: (state, action: PayloadAction<IUser>) => {
      state.value = state.value.map(user => {
        if (user.id === action.payload.id) return action.payload;

        return user;
      });
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getUsers.pending, state => {
        state.status = 'loading';
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload as unknown as IUser[];
      });
  }
});

export const { add, edit, remove } = userSlice.actions;

export const selectUsers = (state: RootState) => state.user.value;

export default userSlice.reducer;
