// src/redux/slices/roleSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentRole: 'member', // 'lead' or 'member'
  currentUser: 'John Doe', // Current logged-in user
  availableUsers: [
    'John Doe',
    'Jane Smith', 
    'Mike Johnson',
    'Sarah Wilson',
    'David Brown'
  ]
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    switchRole: (state, action) => {
      // If payload is provided, use it; otherwise toggle
      if (action.payload) {
        state.currentRole = action.payload;
      } else {
        state.currentRole = state.currentRole === 'lead' ? 'member' : 'lead';
      }
      
      // Update user based on role
      if (state.currentRole === 'lead') {
        state.currentUser = 'Sarah Wilson';
      } else {
        state.currentUser = 'John Doe';
      }
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    }
  }
});

export const { switchRole, setCurrentUser } = roleSlice.actions;
export default roleSlice.reducer;