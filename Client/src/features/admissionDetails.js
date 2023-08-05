    import { createSlice } from '@reduxjs/toolkit';

const admissionDetailsSlice = createSlice({
  name: 'admissionDetails',
  initialState: {
    value: {
      admissionDetails: [], 
    },
  },
  reducers: {
    updateAdmissionDetails: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateAdmissionDetails } = admissionDetailsSlice.actions;
export default admissionDetailsSlice.reducer;
