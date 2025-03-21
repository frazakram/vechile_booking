import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import serviceService from '../services/serviceService';

const initialState = {
  serviceTypes: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// Get service types
export const getServiceTypes = createAsyncThunk(
  'services/getTypes',
  async (_, thunkAPI) => {
    try {
      return await serviceService.getServiceTypes();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getServiceTypes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getServiceTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.serviceTypes = action.payload;
      })
      .addCase(getServiceTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = serviceSlice.actions;
export default serviceSlice.reducer;
