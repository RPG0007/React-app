import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IForm } from '../../types/types';

const initialState: { data: IForm[] } = {
  data: [],
};

export const dataSlice = createSlice({
  name: 'Data',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<IForm[]>) {
      state.data = action.payload;
    },
  },
});

export default dataSlice.reducer;
export const { setData } = dataSlice.actions;
